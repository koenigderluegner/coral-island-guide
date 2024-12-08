import { Component, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { ExpandableComponent } from "../../../shared/components/expandable/expandable.component";
import { DatabaseHeaderButtonComponent } from "../database-header-button/database-header-button.component";
import { CookingTableComponent } from "../../../crafting/components/tables/cooking-table/cooking-table.component";

@Component({
    selector: 'app-database-cooking',
    templateUrl: './database-cooking.component.html',
    encapsulation: ViewEncapsulation.None,

    imports: [
        ExpandableComponent,
        DatabaseHeaderButtonComponent,
        CookingTableComponent
    ]
})
export class DatabaseCookingComponent extends BaseDatabaseDetailPartComponent {
}
