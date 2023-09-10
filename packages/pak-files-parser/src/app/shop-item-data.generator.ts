import { BaseGenerator } from "./base-generator.class";
import { Effect, Item, RequirementEntry, ShopItemData } from "@ci/data-types";
import { RawShopItemData } from "../interfaces/raw-data-interfaces/raw-shop-item-data.interface";
import { minifyItem, readAsset } from "../util/functions";
import { Datatable } from "../interfaces/datatable.interface";
import { getEnumValue } from "@ci/util";


export class ShopItemDataGenerator extends BaseGenerator<RawShopItemData, ShopItemData> {

    datatable: Datatable<RawShopItemData>[];

    constructor(protected itemMap: Map<string, Item>, datatablePath: string) {
        super();
        this.datatable = readAsset<Datatable<RawShopItemData>[]>(datatablePath);
    }

    handleEntry(itemKey: string, dbItem: RawShopItemData): ShopItemData | undefined {


        const foundItem = this.itemMap.get(dbItem.item.itemID);

        if (!foundItem) return;

        const effectsAndRequirements: { effects?: Effect[], requirements?: RequirementEntry } = {}

        const requirements = this.getRequirements(itemKey);

        if (requirements && requirements.requirements.length) {
            effectsAndRequirements.requirements = requirements
        }

        const effects = this.getEffects(itemKey);

        if (effects && effects.length) {
            effectsAndRequirements.effects = effects
        }

        const item: ShopItemData['item'] = {
            ...minifyItem(foundItem),
            price: foundItem.price,
            sellPrice: foundItem.sellPrice
        };

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
            ...sinceDate,
            ...tillDate,
            ...timeRange,
            ...effectsAndRequirements
        };
    }

}
