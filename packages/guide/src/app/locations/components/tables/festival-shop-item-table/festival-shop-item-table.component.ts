import { Component, OnInit } from '@angular/core';
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { FestivalShopItemData } from "@ci/data-types";
import { MoneyComponent } from "../../../../shared/components/money/money.component";
import { PercentPipe } from "@angular/common";
import { TownrankPipe } from "../../../../shared/pipes/townrank.pipe";
import { MatTableModule } from "@angular/material/table";
import { RouterLink } from "@angular/router";
import { ItemIconComponent } from "../../../../shared/components/item-icon/item-icon.component";
import { ResponsiveTableComponent } from "../../../../shared/components/responsive-table/responsive-table.component";
import { MatSortHeader } from "@angular/material/sort";

@Component({
    selector: 'app-festival-shop-item-table',
    templateUrl: './festival-shop-item-table.component.html',

    imports: [
        MoneyComponent,
        PercentPipe,
        TownrankPipe,
        RouterLink,
        MatSortHeader,
        ItemIconComponent,
        MatTableModule,
        ResponsiveTableComponent
    ]
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

    ngOnInit() {
        if (this._dataSource().length && this._dataSource()[0].festival) {
            this.displayedColumns.splice(2, 0, 'shop');
            this.displayHeaderColumns = this.displayedColumns.filter(column => column !== 'icon')
        }
    }
}
