import { RawShopItemData } from "./raw-shop-item-data.interface";

export type RawFestivalShopItemData = RawShopItemData & {
    "festivalSetting": {
        "hasDiscount": boolean,
        "discount": number,
        "isLimitedItem": boolean,
        "itemLimit": number,
        "hasYearlyLimit": boolean,
        "itemLimitPerYear": number
    }
}
