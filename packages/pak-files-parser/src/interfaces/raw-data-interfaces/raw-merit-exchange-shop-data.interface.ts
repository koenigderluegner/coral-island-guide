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
    "shopItemName": {
        "CultureInvariantString": null
    },
    "useCustomIcon": boolean,
    "customIcon": {
        "AssetPathName": string
        "SubPathString": string
    },
    "useCustomCategory": boolean,
    "customCategory": {
        "CultureInvariantString": null
    },
    "useCustomDescription": boolean,
    "customDescription": {
        "CultureInvariantString": null
    },
    "useCategory": boolean,
    "category": string;
    "priority": number,
    "priceOverride": number
    "tag": string[]
}
