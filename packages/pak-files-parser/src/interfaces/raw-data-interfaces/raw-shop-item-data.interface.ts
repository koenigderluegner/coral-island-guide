import { SpecificDate, Time } from "@ci/data-types";

export interface RawShopItemData {
    "allowedSeasons": string[],
    "forbiddenSeasons": string[],
    "allowedDays": string[],
    "forbiddenDays": string[],
    "availableSinceDate": boolean,
    "sinceDate": SpecificDate,
    "availableTillDate": boolean,
    "tillDate": SpecificDate,
    "availableDuringTime": boolean,
    "timeRange": {
        "fromTime": Time,
        "toTime": Time
    },
    "allowedWeather": string[],
    "forbiddenWeather": string[],
    "enable": boolean,
    "isCurrentlyOutOfStock": boolean,
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
        "AssetPathName": string,
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
    "category": string,
    "priority": number,
    "priceOverride": number,
    "tag": string[]
}
