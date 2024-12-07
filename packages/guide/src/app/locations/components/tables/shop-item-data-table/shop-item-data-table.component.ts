import { Component, OnInit } from '@angular/core';
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { ShopItemData } from "@ci/data-types";

@Component({
    selector: 'app-shop-item-data-table',
    templateUrl: './shop-item-data-table.component.html',
    standalone: false
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
