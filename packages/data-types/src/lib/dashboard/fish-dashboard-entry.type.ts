import { Fish, MinimalItem, Season, Weather } from "@ci/data-types";

export type FishDashboardEntry = {
    id: string,
    item: MinimalItem,
    seasons: Season[],
    weathers: Weather[],
    dateRanges: Fish['spawnSettings'][0]['dateRangeList']
}
