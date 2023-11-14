import { FestivalShopItemData } from "@ci/data-types";
import { ShopItemDataGenerator } from "./shop-item-data.generator";
import { RawFestivalShopItemData } from "../interfaces/raw-data-interfaces/raw-festival-shop-item-data.interface";
import { GeneratorOptions } from "./base-generator.class";


export class FestivalShopItemDataGenerator extends ShopItemDataGenerator<RawFestivalShopItemData> {


    override handleEntry(itemKey: string, dbItem: RawFestivalShopItemData): FestivalShopItemData | undefined {

        const shopEntry = super.handleEntry(itemKey, dbItem)
        if (!shopEntry) return undefined;
        return {
            festivalSetting: dbItem.festivalSetting,
            ...shopEntry
        };
    }

    override generate(options?: GeneratorOptions): Map<string, FestivalShopItemData> {
        this.options = options;

        if (options && options.daFiles) {
            this.getEffectsAndRequirements(options.daFiles)
               }


        const map: Map<string, FestivalShopItemData> = new Map<string, FestivalShopItemData>();

        Object.keys(this.datatable?.[0]?.Rows).forEach(itemKey => {
            const dbItem = this.getDBItem(itemKey);
            const entry: FestivalShopItemData | undefined = this.handleEntry(itemKey, dbItem);

            if (entry !== undefined)
                map.set(itemKey, entry);
        });

        return map;
    }

}
