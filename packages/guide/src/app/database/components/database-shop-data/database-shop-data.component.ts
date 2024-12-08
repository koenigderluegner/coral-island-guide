import { Component } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { ExpandableComponent } from "../../../shared/components/expandable/expandable.component";
import { DatabaseHeaderButtonComponent } from "../database-header-button/database-header-button.component";
import { ShopItemDataTableComponent } from "../../../locations/components/tables/shop-item-data-table/shop-item-data-table.component";

@Component({
    selector: 'app-database-shop-data',
    templateUrl: './database-shop-data.component.html',

    imports: [
        ExpandableComponent,
        DatabaseHeaderButtonComponent,
        ShopItemDataTableComponent
    ]
})
export class DatabaseShopDataComponent extends BaseDatabaseDetailPartComponent {
}
