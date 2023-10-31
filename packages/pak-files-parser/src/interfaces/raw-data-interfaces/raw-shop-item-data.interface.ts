import { SpecificDate, Time } from "@ci/data-types";
import { SourceString } from "../../types/source-string.type";

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
    "shopItemName": SourceString,
    "useCustomIcon": boolean,
    "customIcon": {
        "AssetPathName": string,
        "SubPathString": string
    },
    "useCustomCategory": boolean,
    "customCategory": SourceString,
    "useCustomDescription": boolean,
    "customDescription": SourceString,
    "useCategory": boolean,
    "category": string,
    "priority": number,
    "priceOverride": number,
    "tag": string[]
}
