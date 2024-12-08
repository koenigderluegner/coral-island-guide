import { Component } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { ExpandableComponent } from "../../../shared/components/expandable/expandable.component";
import { DatabaseHeaderButtonComponent } from "../database-header-button/database-header-button.component";
import { ItemUpgradeTableComponent } from "../../../locations/components/tables/item-upgrade-table/item-upgrade-table.component";

@Component({
    selector: 'app-database-item-upgrade',
    templateUrl: './database-item-upgrade.component.html',

    imports: [
        ExpandableComponent,
        DatabaseHeaderButtonComponent,
        ItemUpgradeTableComponent
    ]
})
export class DatabaseItemUpgradeComponent extends BaseDatabaseDetailPartComponent {
}
