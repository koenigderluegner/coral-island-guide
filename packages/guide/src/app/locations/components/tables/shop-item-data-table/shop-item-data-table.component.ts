import { Component, OnInit } from '@angular/core';
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { ShopItemData } from "@ci/data-types";
import { ResponsiveTableComponent } from "../../../../shared/components/responsive-table/responsive-table.component";
import { MatCell, MatColumnDef, MatHeaderCell, MatHeaderRow, MatRow, MatTable } from "@angular/material/table";
import { ItemIconComponent } from "../../../../shared/components/item-icon/item-icon.component";
import { RouterLink } from "@angular/router";
import { TownrankPipe } from "../../../../shared/pipes/townrank.pipe";
import { MatSortHeader } from "@angular/material/sort";
import { MoneyComponent } from "../../../../shared/components/money/money.component";

@Component({
    selector: 'app-shop-item-data-table',
    templateUrl: './shop-item-data-table.component.html',

    imports: [
        ResponsiveTableComponent,
        MatTable,
        ItemIconComponent,
        RouterLink,
        MatColumnDef,
        TownrankPipe,
        MatCell,
        MatHeaderCell,
        MatSortHeader,
        MoneyComponent,
        MatRow,
        MatHeaderRow
    ]
})
export class ShopItemDataTableComponent extends BaseTableComponent<ShopItemData & {
    shop?: { url: string; displayName: string }
}> implements OnInit {
    protected readonly BASE_DISPLAY_COLUMNS: string[] = [
        'icon',
        'displayName',
        'townRank',
        'price',
        'sellPrice'
    ];

    ngOnInit() {
        if (this._dataSource().length && this._dataSource()[0].shop) {
            this.displayedColumns.splice(2, 0, 'shop');
            this.displayHeaderColumns = this.displayedColumns.filter(column => column !== 'icon')
        }
    }


}
