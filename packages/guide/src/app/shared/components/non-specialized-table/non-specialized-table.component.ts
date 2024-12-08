import { Component } from '@angular/core';
import { BaseTableComponent } from "../base-table/base-table.component";
import { Item } from "@ci/data-types";
import { ItemIconComponent } from "../item-icon/item-icon.component";
import { MatTableModule } from "@angular/material/table";
import { ResponsiveTableComponent } from "../responsive-table/responsive-table.component";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import { MoneyComponent } from "../money/money.component";

@Component({
    selector: 'app-non-specialized-table',
    templateUrl: './non-specialized-table.component.html',

    imports: [
        ItemIconComponent,
        ResponsiveTableComponent,
        MatSort,
        MoneyComponent,
        MatTableModule,
        MatSortHeader
    ]
})
export class NonSpecializedTableComponent extends BaseTableComponent<Item> {
    protected readonly BASE_DISPLAY_COLUMNS: string[] = [
        'icon',
        'displayName',
        'sellPrice'
    ];

    override sortingDataAccessor = (item: ReturnType<NonSpecializedTableComponent['dataSource']>[0], property: string) => {
        const sortHelperValue = this.sortHelper(item, property)

        return sortHelperValue ?? 0;
    };

}
