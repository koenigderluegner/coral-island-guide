import { Component } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { ExpandableComponent } from "../../../shared/components/expandable/expandable.component";
import { DatabaseHeaderButtonComponent } from "../database-header-button/database-header-button.component";
import { OfferingsTableComponent } from "../../../locations/components/tables/offerings-table/offerings-table.component";

@Component({
    selector: 'app-database-offerings',
    templateUrl: './database-offerings.component.html',

    imports: [
        ExpandableComponent,
        DatabaseHeaderButtonComponent,
        OfferingsTableComponent
    ]
})
export class DatabaseOfferingsComponent extends BaseDatabaseDetailPartComponent {
}
