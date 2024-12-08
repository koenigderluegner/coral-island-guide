import { Component, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { ExpandableComponent } from "../../../shared/components/expandable/expandable.component";
import { DatabaseHeaderButtonComponent } from "../database-header-button/database-header-button.component";
import { CaughtTableComponent } from "../../../journal/components/tables/caught-table/caught-table.component";

@Component({
    selector: 'app-database-sea-critters',
    templateUrl: './database-sea-critters.component.html',
    encapsulation: ViewEncapsulation.None,

    imports: [
        ExpandableComponent,
        DatabaseHeaderButtonComponent,
        CaughtTableComponent
    ]
})
export class DatabaseSeaCrittersComponent extends BaseDatabaseDetailPartComponent {
}
