import { Item, MinimalItem } from "@ci/data-types";
import { Datatable } from "../../../interfaces/datatable.interface";
import { minifyItem, readAsset } from "../../../util/functions";
import type { RawShopItemData } from "../../../interfaces/raw-data-interfaces/raw-shop-item-data.interface";
import { Logger } from "../../../util/logger.class";


export class BoughtChecklistGenerator {
    protected assets = readAsset<Datatable<RawShopItemData>[]>('ProjectCoral/Content/ProjectCoral/Quest/Achievement/Shop/DT_ClothingShopAchievement.json')[0].Rows

    constructor(protected itemMap: Map<string, Item>) {
    }

    generate(): Map<string, Record<string, MinimalItem[]>> {
        const resObject: Record<string, MinimalItem[]> = {};

        for (const key of Object.keys(this.assets)) {
            const listName = this.assets[key];
            const item = this.itemMap.get(listName.item.itemID);

            if (!item) {
                Logger.warn('Cant find item in clothing list: ' + listName.item.itemID);
                continue;
            }


            const category = key
                .split('_')[0]
                .toLocaleLowerCase()
                .replaceAll('unique', '') // because of unique outfit/uniqueoutfit
                .trim()


            if (!resObject[category]) {
                resObject[category] = [];
            }

            resObject[category].push(minifyItem(item));

        }

        const result = new Map<string, Record<string, MinimalItem[]>>;
        result.set('unused', resObject);
        return result;

    }
}
