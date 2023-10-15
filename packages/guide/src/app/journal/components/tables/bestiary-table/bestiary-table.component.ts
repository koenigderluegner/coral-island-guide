import { Component } from '@angular/core';
import { Enemy } from "@ci/data-types";
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";

@Component({
    selector: 'app-bestiary-table',
    templateUrl: './bestiary-table.component.html',
})
export class BestiaryTableComponent extends BaseTableComponent<Enemy> {
    protected readonly BASE_DISPLAY_COLUMNS: string[] = [
        'icon',
        'displayName',
        'experience',
        'dropRates'
    ];
}
