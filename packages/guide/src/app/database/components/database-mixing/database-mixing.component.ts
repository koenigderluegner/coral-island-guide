import { Component, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { ExpandableComponent } from "../../../shared/components/expandable/expandable.component";
import { DatabaseHeaderButtonComponent } from "../database-header-button/database-header-button.component";
import { MixingTableComponent } from "../../../crafting/mixing-table/mixing-table.component";

@Component({
    selector: 'app-database-mixing',
    templateUrl: './database-mixing.component.html',
    encapsulation: ViewEncapsulation.None,

    imports: [
        ExpandableComponent,
        DatabaseHeaderButtonComponent,
        MixingTableComponent
    ]
})
export class DatabaseMixingComponent extends BaseDatabaseDetailPartComponent {
}
