import { Component, OnInit } from '@angular/core';
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { ItemUpgradeData } from "@ci/data-types";
import { MoneyComponent } from "../../../../shared/components/money/money.component";
import { MatTableModule } from "@angular/material/table";
import { TableItemListComponent } from "../../../../shared/components/table-item-list/table-item-list.component";
import { TownrankPipe } from "../../../../shared/pipes/townrank.pipe";
import { RouterLink } from "@angular/router";
import { ItemIconComponent } from "../../../../shared/components/item-icon/item-icon.component";
import { ResponsiveTableComponent } from "../../../../shared/components/responsive-table/responsive-table.component";
import { MatSort, MatSortHeader } from "@angular/material/sort";

@Component({
    selector: 'app-item-upgrade-table',
    templateUrl: './item-upgrade-table.component.html',

    imports: [
        MoneyComponent,
        TableItemListComponent,
        TownrankPipe,
        RouterLink,
        ItemIconComponent,
        MatTableModule,
        ResponsiveTableComponent,
        MatSort,
        MatSortHeader
    ]
})
export class ItemUpgradeTableComponent extends BaseTableComponent<ItemUpgradeData & {
    shop?: { url: string; displayName: string }
}> implements OnInit {
    protected readonly BASE_DISPLAY_COLUMNS: string[] = [
        'icon',
        'displayName',
        'townRank',
        'unlockRequirements',
        'daysDelay',
        'requirements'
    ];

    ngOnInit() {
        if (this._dataSource().length && this._dataSource()[0].shop) {
            this.displayedColumns.splice(2, 0, 'shop');
            this.displayHeaderColumns = this.displayedColumns.filter(column => column !== 'icon')
        }
    }
}
