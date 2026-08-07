import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { ExpandableComponent } from "../../../shared/components/expandable/expandable.component";
import { DatabaseHeaderButtonComponent } from "../database-header-button/database-header-button.component";
import { ShopItemProcessTableComponent } from "../../../locations/components/tables/shop-item-process-table/shop-item-process-table.component";

@Component({
    selector: 'app-database-shop-item-process',
    templateUrl: './database-shop-item-process.component.html',

    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        ExpandableComponent,
        DatabaseHeaderButtonComponent,
        ShopItemProcessTableComponent
    ]
})
export class DatabaseShopItemProcessComponent extends BaseDatabaseDetailPartComponent {
}
