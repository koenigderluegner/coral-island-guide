import { Item, MinimalItem, SpecificDate, Time } from "@ci/data-types";


export type ShopItemData = {
    "allowedSeasons": string[],
    "forbiddenSeasons": string[],
    "allowedDays": string[],
    "forbiddenDays": string[],
    "allowedWeather": string[],
    "forbiddenWeather": string[],
    "townRank": number;
    item: MinimalItem & Pick<Item, 'price'>;
    "priority": number,
    "priceOverride": number,
    "tag": string[]
    "availableSinceDate": boolean,
    "sinceDate"?: SpecificDate,
    "availableTillDate": boolean,
    "tillDate"?: SpecificDate,
    "availableDuringTime": boolean,
    "timeRange"?: { "fromTime": Time, "toTime": Time };
}
