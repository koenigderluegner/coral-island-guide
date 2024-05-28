import { BaseGenerator } from "../_base/base-generator.class";
import { CustomEntry, Effect, Item, RequirementEntry, ShipToUnlockRequirement, ShopItemData } from "@ci/data-types";
import { RawShopItemData } from "../../../interfaces/raw-data-interfaces/raw-shop-item-data.interface";
import { AssetPathNameToIcon, minifyItem, readAsset } from "../../../util/functions";
import { Datatable } from "../../../interfaces/datatable.interface";
import { getEnumValue } from "@ci/util";
import { StringTable } from "../../../util/string-table.class";
import { Logger } from "../../../util/logger.class";
import { ItemShipUnlockDataGenerator } from "../misc/item-ship-unlock-data.generator";


export class ShopItemDataGenerator<T extends RawShopItemData = RawShopItemData> extends BaseGenerator<T, ShopItemData> {

    datatable: Datatable<T>[];

    shipToUnlock: Record<string, ShipToUnlockRequirement> = {}

    constructor(protected itemMap: Map<string, Item>, protected datatablePath: string, options?: {
        itemShipUnlockData?: string | string[]
    }) {
        super();
        this.datatable = readAsset<Datatable<T>[]>(datatablePath);

        const shipToUnlock = options?.itemShipUnlockData;

        if (shipToUnlock) {
            (Array.isArray(shipToUnlock) ? shipToUnlock : [shipToUnlock]).forEach(s => {
                const a = [...new ItemShipUnlockDataGenerator(this.itemMap, s).generate().values()];
                a.forEach(si => this.shipToUnlock[si.itemId] = si.value)
            })
        }


    }

    handleEntry(itemKey: string, dbItem: T): ShopItemData | undefined {


        const foundItem = this.itemMap.get(dbItem.item.itemID);

        const displayName = StringTable.getString(dbItem.shopItemName);
        const customEntry: CustomEntry = {
            id: itemKey,
            displayName: displayName ?? '',
            iconName: AssetPathNameToIcon(dbItem.customIcon.AssetPathName),
            description: StringTable.getString(dbItem.customDescription),
            displayKey: StringTable.getString(dbItem.customCategory)
        }

        if (!foundItem && !customEntry.displayName) {
            Logger.error(`Cant find shop items ${itemKey} in ${this.datatablePath}`)
            return;
        }

        const effectsAndRequirements: { effects?: Effect[], requirements?: RequirementEntry } = {}

        let requirements = this.getRequirements(itemKey);

        const shipToUnlockElement = this.shipToUnlock[dbItem.item.itemID];

        if (shipToUnlockElement) {
            if (!requirements) {
                requirements = {
                    key: itemKey,
                    requirements: [],
                    type: 'And'
                }
            }
            requirements.requirements.push(shipToUnlockElement)
        }

        if (requirements && requirements.requirements.length) {
            effectsAndRequirements.requirements = requirements
        }

        const effects = this.getEffects(itemKey);

        if (effects && effects.length) {
            effectsAndRequirements.effects = effects
        }

        let item: ShopItemData['item'];

        if (foundItem) {
            item = {
                ...minifyItem(foundItem),
                price: foundItem.price,
                sellPrice: foundItem.sellPrice
            };
        } else {
            item = {
                ...customEntry,
                price: dbItem.priceOverride,
                sellPrice: 0
            }
        }

        const tillDate: Pick<ShopItemData, 'availableTillDate' | 'tillDate'> = {
            availableTillDate: dbItem.availableTillDate,
        };

        if (dbItem.availableTillDate) {
            tillDate.tillDate = {
                day: dbItem.tillDate.day,
                season: getEnumValue(dbItem.tillDate.season),
                year: dbItem.tillDate.year
            }
        }

        const sinceDate: Pick<ShopItemData, 'availableSinceDate' | 'sinceDate'> = {
            availableSinceDate: dbItem.availableSinceDate,
        };

        if (dbItem.availableSinceDate) {
            sinceDate.sinceDate = {
                day: dbItem.sinceDate.day,
                season: getEnumValue(dbItem.sinceDate.season),
                year: dbItem.sinceDate.year
            }
        }
        const timeRange: Pick<ShopItemData, 'availableDuringTime' | 'timeRange'> = {
            availableDuringTime: dbItem.availableDuringTime,
        };

        if (dbItem.availableDuringTime) {
            timeRange.timeRange = dbItem.timeRange
        }

        return {
            item,
            allowedDays: dbItem.allowedDays.map(getEnumValue).filter(s => s !== 'None'),
            allowedSeasons: dbItem.allowedSeasons.map(getEnumValue).filter(s => s !== 'None'),
            allowedWeather: dbItem.allowedWeather.map(getEnumValue).filter(s => s !== 'None'),
            forbiddenDays: dbItem.forbiddenDays.map(getEnumValue).filter(s => s !== 'None'),
            forbiddenSeasons: dbItem.forbiddenSeasons.map(getEnumValue).filter(s => s !== 'None'),
            forbiddenWeather: dbItem.forbiddenWeather.map(getEnumValue).filter(s => s !== 'None'),
            townRank: dbItem.townRank,
            tag: dbItem.tag,
            priceOverride: dbItem.priceOverride,
            priority: dbItem.priority,
            enabled: dbItem.enable,
            ...sinceDate,
            ...tillDate,
            ...timeRange,
            ...effectsAndRequirements
        };
    }

}
