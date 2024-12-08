import { Component, input, model } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Seasons, Weathers } from "@ci/data-types";
import { FilterForm } from "../../types/filter-form.type";

@Component({
    selector: 'app-data-filter',
    templateUrl: './data-filter.component.html',
    standalone: false,
    host: {
        'class': 'my-3 flex gap-x-3 gap-y-4 flex-wrap'
    }
})
export class DataFilterComponent {

    readonly parentFormGroup = input<FormGroup<FilterForm>>();
    readonly locations = input<string[]>([])
    readonly showTable = model(false);
    protected readonly Seasons = Seasons;
    protected readonly Weathers = Weathers;

    setShowTable(showTable: boolean): void {
        this.showTable.set(showTable);
    }
}
