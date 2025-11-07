import { ShopItemData } from './shop-item-data.interface';

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
