import { Component } from '@angular/core';
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { ItemProcessShopData } from "@ci/data-types";

@Component({
    selector: 'app-shop-item-process-table',
    templateUrl: './shop-item-process-table.component.html',
})
export class ShopItemProcessTableComponent extends BaseTableComponent<ItemProcessShopData & {
    shop?: { url: string; displayName: string }
}> {
    protected readonly BASE_DISPLAY_COLUMNS: string[] = [
        'icon',
        'displayName',
        'outputChances'
    ];

    override ngOnInit() {
        super.ngOnInit();
        if (this.dataSource.length && this.dataSource[0].shop) {
            this.displayedColumns.splice(2, 0, 'shop');
            this.displayHeaderColumns = this.displayedColumns.filter(column => column !== 'icon')
        }
    }
}
