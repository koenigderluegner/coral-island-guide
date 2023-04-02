import { FormControl } from "@angular/forms";
import { Season } from "../enums/season.enum";

export type FilterForm = { season?: FormControl<Season[]>, weather?: FormControl<string[]> }
