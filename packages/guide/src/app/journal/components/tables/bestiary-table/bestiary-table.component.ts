import { Component } from '@angular/core';
import { Enemy } from "@ci/data-types";
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { ResponsiveTableComponent } from "../../../../shared/components/responsive-table/responsive-table.component";
import { MatCell, MatColumnDef, MatHeaderCell, MatHeaderRow, MatRow, MatTable } from "@angular/material/table";
import { ItemIconComponent } from "../../../../shared/components/item-icon/item-icon.component";
import { ChancePerItemTableListComponent } from "../../../../shared/components/chance-per-item-table-list/chance-per-item-table-list.component";
import { MatSort, MatSortHeader } from "@angular/material/sort";

@Component({
    selector: 'app-bestiary-table',
    templateUrl: './bestiary-table.component.html',

    imports: [
        ResponsiveTableComponent,
        MatTable,
        ItemIconComponent,
        ChancePerItemTableListComponent,
        MatColumnDef,
        MatHeaderCell,
        MatSort,
        MatCell,
        MatHeaderRow,
        MatRow,
        MatSortHeader
    ]
})
export class BestiaryTableComponent extends BaseTableComponent<Enemy> {
    protected readonly BASE_DISPLAY_COLUMNS: string[] = [
        'icon',
        'displayName',
        'experience',
        'dropRates'
    ];
}
