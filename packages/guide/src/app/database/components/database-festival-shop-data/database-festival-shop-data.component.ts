import { Component } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { ExpandableComponent } from "../../../shared/components/expandable/expandable.component";
import { DatabaseHeaderButtonComponent } from "../database-header-button/database-header-button.component";
import { FestivalShopItemTableComponent } from "../../../locations/components/tables/festival-shop-item-table/festival-shop-item-table.component";

@Component({
    selector: 'app-database-festival-shop-data',
    templateUrl: './database-festival-shop-data.component.html',

    imports: [
        ExpandableComponent,
        DatabaseHeaderButtonComponent,
        FestivalShopItemTableComponent
    ]
})
export class DatabaseFestivalShopDataComponent extends BaseDatabaseDetailPartComponent {
}
