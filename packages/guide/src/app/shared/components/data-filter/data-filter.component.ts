import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Seasons, Weather } from "@ci/data-types";
import { FilterForm } from "../../types/filter-form.type";

@Component({
    selector: 'app-data-filter',
    templateUrl: './data-filter.component.html',
})
export class DataFilterComponent {

    @Input() parentFormGroup?: FormGroup<FilterForm>;

    @Input() showTable!: boolean;
    @Output() showTableChange = new EventEmitter<boolean>();

    protected weather = Weather;
    protected readonly Seasons = Seasons;

    setShowTable(showTable: boolean): void {
        this.showTable = showTable;
        this.showTableChange.emit(this.showTable);
    }
}
