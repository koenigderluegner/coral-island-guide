import { Fish, Season, Weather } from "@ci/data-types";

export type FishDashboardEntry = {
    id: string,
    iconName: string | null,
    seasons: Season[],
    weathers: Weather[],
    dateRanges: Fish['spawnSettings'][0]['dateRangeList']
}
