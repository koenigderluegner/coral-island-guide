import { SpecificDate, Time } from "@ci/data-types";
import { SourceString } from "../../types/source-string.type";
import { AssetPath } from "../../types/asset-path.type";
import { DatatableRef } from "../../types/datatable-ref.type";

export interface RawShopItemData {
    "isLimitedItemQty": boolean,
    "itemLimitQty": number,
    "restockDays": string[],
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
    "townRank": number,
    "item": {
        "data": DatatableRef,
        "itemID": string
    },
    "useCustomName": boolean,
    "shopItemName": SourceString,
    "useCustomIcon": boolean,
    "customIcon": AssetPath,
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
