import { FormControl } from "@angular/forms";
import { Season, Weather } from "@ci/data-types";

export type DashboardFilterData = {
    day: number,
    season: Season,
    year: number,
    weather: Weather
    hideCompleted: boolean
}

export type DashboardFilter = {
    [key in keyof DashboardFilterData]: FormControl<DashboardFilterData[key]>
}
