import { SourceString } from "../../types/source-string.type";

export interface RawMeritExchangeShopData {
    "isLimitedItem": boolean,
    "itemLimit": number,
    "isStaminaFruit": boolean,
    "isUsingCustomEffect": boolean,
    "isUnlockRecipe": boolean,
    "enable": boolean,
    "townRank": number,
    "item": {
        "data": {
            "DataTable": {
                "ObjectName": string
                "ObjectPath": string
            },
            "RowName": string
        },
        "itemID": string
    },
    "useCustomName": boolean,
    "shopItemName": SourceString,
    "useCustomIcon": boolean,
    "customIcon": {
        "AssetPathName": string
        "SubPathString": string
    },
    "useCustomCategory": boolean,
    "customCategory": SourceString,
    "useCustomDescription": boolean,
    "customDescription": SourceString,
    "useCategory": boolean,
    "category": string;
    "priority": number,
    "priceOverride": number
    "tag": string[]
}
