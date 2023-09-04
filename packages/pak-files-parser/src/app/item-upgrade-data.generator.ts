import { BaseGenerator } from "./base-generator.class";
import { Item, ItemUpgradeData, MinimalItem, Quality } from "@ci/data-types";
import { minifyItem, readAsset } from "../util/functions";
import { Datatable } from "../interfaces/datatable.interface";
import { getEnumValue, nonNullable } from "@ci/util";
import { RawItemUpgradeData } from "../interfaces/raw-data-interfaces/raw-item-upgrade-data.interface";
import { RawLabUpgradeData } from "../interfaces/raw-data-interfaces/raw-lab-upgrade-data.interface";

export class ItemUpgradeDataGenerator extends BaseGenerator<RawItemUpgradeData, ItemUpgradeData> {

    datatable: Datatable<RawItemUpgradeData>[];

    constructor(protected itemMap: Map<string, Item>, datatablePath: string) {
        super();
        this.datatable = readAsset<Datatable<RawItemUpgradeData>[]>(datatablePath);
    }

    handleEntry(itemKey: string, dbItem: RawItemUpgradeData | RawLabUpgradeData): ItemUpgradeData | undefined {


        const foundItem = this.itemMap.get(dbItem.item.itemID);

        if (!foundItem) return;

        const item: MinimalItem = minifyItem(foundItem)

        const requirements: { item: MinimalItem, amount: number; }[] = dbItem.requirements.map(requirement => {
            const foundRequirement = this.itemMap.get(requirement.item.itemID);
            if (!foundRequirement) return undefined;
            return {
                item: minifyItem(foundRequirement),
                amount: requirement.amount
            }
        }).filter(nonNullable)
        const unlockRequirements: {
            item: MinimalItem,
            amount: number;
        }[] = dbItem.unlockRequirements.map(requirement => {
            const foundRequirement = this.itemMap.get(requirement.item.itemID);
            if (!foundRequirement) return undefined;
            return {
                item: minifyItem(foundRequirement),
                amount: requirement.amount
            }
        }).filter(nonNullable)


        const result: ItemUpgradeData = {
            item,
            price: dbItem.price,
            daysDelay: dbItem.daysDelay,
            townRank: dbItem.townRank,
            tag: dbItem.tag,
            priceOverride: dbItem.priceOverride,
            priority: dbItem.priority,
            requirements,
            unlockRequirements,
            category: getEnumValue(dbItem.category),
            customIcon: dbItem.customIcon.AssetPathName === 'None' ? null : dbItem.customIcon.AssetPathName,
            hardnessLevel: getEnumValue(dbItem.hardnessLevel),
            toolType: getEnumValue(dbItem.toolType),
            useCategory: dbItem.useCategory,
            useCustomIcon: dbItem.useCustomIcon
        };

        if ('affecting' in dbItem) {
            result.affecting = getEnumValue(dbItem.affecting);
            result.level = dbItem.level === 1
                ? Quality.BRONZE
                : dbItem.level === 2
                    ? Quality.SILVER
                    : dbItem.level === 3
                        ? Quality.GOLD
                        : dbItem.level === 4
                            ? Quality.OSMIUM
                            : Quality.BASE
        }

        return result;
    }

}
