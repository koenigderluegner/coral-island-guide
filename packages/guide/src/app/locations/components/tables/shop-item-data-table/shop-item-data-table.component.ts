import { Component, OnInit } from '@angular/core';
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { ShopItemData } from "@ci/data-types";

@Component({
    selector: 'app-shop-item-data-table',
    templateUrl: './shop-item-data-table.component.html',
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

    override ngOnInit() {
        super.ngOnInit();
        if (this.dataSource.length && this.dataSource[0].shop) {
            this.displayedColumns.splice(2, 0, 'shop');
            this.displayHeaderColumns = this.displayedColumns.filter(column => column !== 'icon')
        }
    }


}
