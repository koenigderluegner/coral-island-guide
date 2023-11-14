import { ShopItemData } from "@ci/data-types";

export type FestivalShopItemData = ShopItemData & {
    "festivalSetting": {
        "hasDiscount": boolean,
        "discount": number,
        "isLimitedItem": boolean,
        "itemLimit": number,
        "hasYearlyLimit": boolean,
        "itemLimitPerYear": number
    }
}
