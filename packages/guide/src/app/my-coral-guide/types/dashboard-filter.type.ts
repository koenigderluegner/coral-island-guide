import { FormControl } from "@angular/forms";
import { Season, Weather } from "@ci/data-types";

export type DashboardFilter = {
    day: FormControl<number>,
    season: FormControl<Season>,
    year: FormControl<number>,
    weather: FormControl<Weather>
    hideCompleted: FormControl<boolean>
}
