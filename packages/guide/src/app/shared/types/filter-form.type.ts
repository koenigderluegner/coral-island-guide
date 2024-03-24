import { FormControl } from "@angular/forms";
import { Season } from "@ci/data-types";

export type FilterForm = {
    season?: FormControl<Season[]>,
    weather?: FormControl<string[]>,
    location?: FormControl<string | null>
}
