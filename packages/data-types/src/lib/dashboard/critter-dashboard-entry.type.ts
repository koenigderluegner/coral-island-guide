import { Season, Weather } from "@ci/data-types";

export type CritterDashboardEntry = {
    id: string,
    iconName: string | null,
    seasons: Season[],
    weathers: Weather[]
}
