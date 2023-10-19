import { CustomEntry, Effect, Item, MinimalItem, RequirementEntry, SpecificDate, Time } from "@ci/data-types";


export type ShopItemData = {
    allowedSeasons: string[],
    forbiddenSeasons: string[],
    allowedDays: string[],
    forbiddenDays: string[],
    allowedWeather: string[],
    forbiddenWeather: string[],
    townRank: number;
    item: (CustomEntry | MinimalItem) & Pick<Item, 'price' | 'sellPrice'>;
    priority: number,
    enabled: boolean,
    priceOverride: number,
    tag: string[]
    availableSinceDate: boolean,
    sinceDate?: SpecificDate,
    availableTillDate: boolean,
    tillDate?: SpecificDate,
    availableDuringTime: boolean,
    timeRange?: { fromTime: Time, toTime: Time };
    effects?: Effect[],
    requirements?: RequirementEntry
}
