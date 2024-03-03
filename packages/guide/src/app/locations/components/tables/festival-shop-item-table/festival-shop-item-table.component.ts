import { Component, OnInit } from '@angular/core';
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { FestivalShopItemData } from "@ci/data-types";

@Component({
    selector: 'app-festival-shop-item-table',
    templateUrl: './festival-shop-item-table.component.html',
})
export class FestivalShopItemTableComponent extends BaseTableComponent<FestivalShopItemData & {
    festival?: { url: string; displayName: string }
}> implements OnInit {
    protected readonly BASE_DISPLAY_COLUMNS: string[] = [
        'icon',
        'displayName',
        'townRank',
        'limit',
        'discount',
        'price',
        'sellPrice'
    ];

    override ngOnInit() {
        super.ngOnInit();
        if (this.dataSource.length && this.dataSource[0].festival) {
            this.displayedColumns.splice(2, 0, 'shop');
            this.displayHeaderColumns = this.displayedColumns.filter(column => column !== 'icon')
        }
    }
}
