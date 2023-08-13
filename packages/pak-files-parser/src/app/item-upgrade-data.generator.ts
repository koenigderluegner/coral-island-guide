import { BaseGenerator } from "./base-generator.class";
import { Item, ItemUpgradeData, MinimalItem } from "@ci/data-types";
import { minifyItem, readAsset } from "../util/functions";
import { Datatable } from "../interfaces/datatable.interface";
import { getEnumValue, nonNullable } from "@ci/util";
import { RawItemUpgradeData } from "../interfaces/raw-item-upgrade-data.interface";

export class ItemUpgradeDataGenerator extends BaseGenerator<RawItemUpgradeData, ItemUpgradeData> {

    datatable: Datatable<RawItemUpgradeData>[];

    constructor(protected itemMap: Map<string, Item>, datatablePath: string) {
        super();
        this.datatable = readAsset<Datatable<RawItemUpgradeData>[]>(datatablePath);
    }

    handleEntry(itemKey: string, dbItem: RawItemUpgradeData): ItemUpgradeData | undefined {


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


        return {
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
    }

}
