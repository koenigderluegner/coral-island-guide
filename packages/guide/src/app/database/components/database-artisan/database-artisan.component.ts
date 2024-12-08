import { Component, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { ExpandableComponent } from "../../../shared/components/expandable/expandable.component";
import { DatabaseHeaderButtonComponent } from "../database-header-button/database-header-button.component";
import { ProcessorTableComponent } from "../../../crafting/components/tables/processor-table/processor-table.component";

@Component({
    selector: 'app-database-artisan',
    templateUrl: './database-artisan.component.html',
    encapsulation: ViewEncapsulation.None,

    imports: [
        ExpandableComponent,
        DatabaseHeaderButtonComponent,
        ProcessorTableComponent
    ]
})
export class DatabaseArtisanComponent extends BaseDatabaseDetailPartComponent {
}
