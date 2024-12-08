import { Component, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { ExpandableComponent } from "../../../shared/components/expandable/expandable.component";
import { DatabaseHeaderButtonComponent } from "../database-header-button/database-header-button.component";
import { InventoryTableComponent } from "../../../crafting/components/tables/inventory-table/inventory-table.component";

@Component({
    selector: 'app-database-crafting',
    templateUrl: './database-crafting.component.html',
    encapsulation: ViewEncapsulation.None,

    imports: [
        ExpandableComponent,
        DatabaseHeaderButtonComponent,
        InventoryTableComponent
    ]
})
export class DatabaseCraftingComponent extends BaseDatabaseDetailPartComponent {
}
