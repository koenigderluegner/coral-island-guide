import { Component, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { ExpandableComponent } from "../../../shared/components/expandable/expandable.component";
import { DatabaseHeaderButtonComponent } from "../database-header-button/database-header-button.component";
import { CropTableComponent } from "../../../journal/components/tables/crop-table/crop-table.component";

@Component({
    selector: 'app-database-crops',
    templateUrl: './database-crops.component.html',
    encapsulation: ViewEncapsulation.None,

    imports: [
        ExpandableComponent,
        DatabaseHeaderButtonComponent,
        CropTableComponent
    ]
})
export class DatabaseCropsComponent extends BaseDatabaseDetailPartComponent {
}
