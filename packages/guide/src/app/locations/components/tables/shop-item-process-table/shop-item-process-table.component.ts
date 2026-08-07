import { Component, effect, ChangeDetectionStrategy } from '@angular/core';
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { ItemProcessShopData } from "@ci/data-types";
import { ResponsiveTableComponent } from "../../../../shared/components/responsive-table/responsive-table.component";
import { MatTableModule } from "@angular/material/table";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import { ItemIconComponent } from "../../../../shared/components/item-icon/item-icon.component";
import { ChancePerItemTableListComponent } from "../../../../shared/components/chance-per-item-table-list/chance-per-item-table-list.component";
import { RouterLink } from "@angular/router";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
    selector: 'app-shop-item-process-table',
    templateUrl: './shop-item-process-table.component.html',

    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        ResponsiveTableComponent,
        MatTableModule,
        MatSort,
        MatSortHeader,
        ItemIconComponent,
        ChancePerItemTableListComponent,
        RouterLink,
        TranslatePipe
    ]
})
export class ShopItemProcessTableComponent extends BaseTableComponent<ItemProcessShopData & {
    shop?: { url: string; displayName: string }
}> {
    protected readonly BASE_DISPLAY_COLUMNS: string[] = [
        'icon',
        'displayName',
        'outputChances'
    ];

    constructor() {
        super();
        effect(() => {
            if (this._dataSource().length && this._dataSource()[0].shop) {
                this.displayedColumns.splice(2, 0, 'shop');
                this.displayHeaderColumns = this.displayedColumns.filter(column => column !== 'icon')
            }
        });
    }
}
