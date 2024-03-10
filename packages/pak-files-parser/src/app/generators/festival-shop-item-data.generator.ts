import { FestivalShopItemData } from "@ci/data-types";
import { ShopItemDataGenerator } from "./shop-item-data.generator";
import { RawFestivalShopItemData } from "../../interfaces/raw-data-interfaces/raw-festival-shop-item-data.interface";
import { GeneratorOptions } from "./base-generator.class";
import { RawShopItemData } from "../../interfaces/raw-data-interfaces/raw-shop-item-data.interface";


export class FestivalShopItemDataGenerator extends ShopItemDataGenerator<RawFestivalShopItemData> {


    _DEFAULT_FESTIVAL_SETTING: FestivalShopItemData['festivalSetting'] = {
        discount: 0,
        itemLimit: 0,
        isLimitedItem: false,
        itemLimitPerYear: 0,
        hasYearlyLimit: false,
        hasDiscount: false
    }

    override handleEntry(itemKey: string, dbItem: RawFestivalShopItemData | RawShopItemData): FestivalShopItemData | undefined {

        let festivalData: RawFestivalShopItemData;
        if (!('festivalSetting' in dbItem)) {
            festivalData = {...dbItem, festivalSetting: this._DEFAULT_FESTIVAL_SETTING}
        } else {
            festivalData = dbItem
        }

        const shopEntry = super.handleEntry(itemKey, festivalData)
        if (!shopEntry) return undefined;
        return {
            festivalSetting: festivalData.festivalSetting,
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
