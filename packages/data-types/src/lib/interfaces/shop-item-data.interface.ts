import { Item, MinimalItem, SpecificDate, Time } from "@ci/data-types";
import { EffectEntry, RequirementEntry } from "../../../../pak-files-parser/src/app/da-files-parser";


export type ShopItemData = {
    "allowedSeasons": string[],
    "forbiddenSeasons": string[],
    "allowedDays": string[],
    "forbiddenDays": string[],
    "allowedWeather": string[],
    "forbiddenWeather": string[],
    "townRank": number;
    item: MinimalItem & Pick<Item, 'price' | 'sellPrice'>;
    "priority": number,
    "priceOverride": number,
    "tag": string[]
    "availableSinceDate": boolean,
    "sinceDate"?: SpecificDate,
    "availableTillDate": boolean,
    "tillDate"?: SpecificDate,
    "availableDuringTime": boolean,
    "timeRange"?: { "fromTime": Time, "toTime": Time };
    effects?: EffectEntry,
    requirements?: RequirementEntry
}
