import { Component, input } from '@angular/core';
import { Seasons, Weathers } from "@ci/data-types";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatOption } from "@angular/material/autocomplete";
import { MatSelect } from "@angular/material/select";
import { DashboardFilter } from "../../types/dashboard-filter.type";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatInput } from "@angular/material/input";
import { addDays } from "@ci/util";

@Component({
    selector: 'app-dashboard-filter',
    imports: [
        FormsModule,
        MatFormField,
        MatLabel,
        MatOption,
        MatSelect,
        ReactiveFormsModule,
        MatCheckbox,
        MatInput,
    ],
    templateUrl: './dashboard-filter.component.html'
})
export class DashboardFilterComponent {
    readonly parentFormGroup = input.required<FormGroup<DashboardFilter>>();
    protected readonly Weathers = Weathers;
    protected readonly Seasons = Seasons;

    increaseDay(daysToAdd: number) {
        this.parentFormGroup().patchValue(addDays(this.parentFormGroup().getRawValue(), daysToAdd))
    }
}
