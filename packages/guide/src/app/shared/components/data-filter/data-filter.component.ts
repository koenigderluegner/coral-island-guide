import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Seasons, Weathers } from "@ci/data-types";
import { FilterForm } from "../../types/filter-form.type";

@Component({
    selector: 'app-data-filter',
    templateUrl: './data-filter.component.html',
    standalone: false
})
export class DataFilterComponent {

    @Input() parentFormGroup?: FormGroup<FilterForm>;
    @Input() locations: string[] = []

    @Input() showTable!: boolean;
    @Output() showTableChange = new EventEmitter<boolean>();
    protected readonly Seasons = Seasons;
    protected readonly Weathers = Weathers;
    @HostBinding('class') private readonly classes = 'my-3 flex gap-x-3 gap-y-4 flex-wrap'

    setShowTable(showTable: boolean): void {
        this.showTable = showTable;
        this.showTableChange.emit(this.showTable);
    }
}
