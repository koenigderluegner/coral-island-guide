import { Component, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { ExpandableComponent } from "../../../shared/components/expandable/expandable.component";
import { DatabaseHeaderButtonComponent } from "../database-header-button/database-header-button.component";
import { CaughtTableComponent } from "../../../journal/components/tables/caught-table/caught-table.component";

@Component({
    selector: 'app-database-insects',
    templateUrl: './database-insects.component.html',
    encapsulation: ViewEncapsulation.None,

    imports: [
        ExpandableComponent,
        DatabaseHeaderButtonComponent,
        CaughtTableComponent
    ]
})
export class DatabaseInsectsComponent extends BaseDatabaseDetailPartComponent {
}
