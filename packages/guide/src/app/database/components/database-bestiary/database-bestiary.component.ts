import { Component } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { ExpandableComponent } from "../../../shared/components/expandable/expandable.component";
import { DatabaseHeaderButtonComponent } from "../database-header-button/database-header-button.component";
import { BestiaryTableComponent } from "../../../journal/components/tables/bestiary-table/bestiary-table.component";

@Component({
    selector: 'app-database-bestiary',
    templateUrl: './database-bestiary.component.html',

    imports: [
        ExpandableComponent,
        DatabaseHeaderButtonComponent,
        BestiaryTableComponent
    ]
})
export class DatabaseBestiaryComponent extends BaseDatabaseDetailPartComponent {
}
