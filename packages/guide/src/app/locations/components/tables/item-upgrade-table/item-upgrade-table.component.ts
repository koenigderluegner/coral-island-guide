import { Component, OnInit } from '@angular/core';
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { ItemUpgradeData } from "@ci/data-types";

@Component({
    selector: 'app-item-upgrade-table',
    templateUrl: './item-upgrade-table.component.html',
    standalone: false
})
export class ItemUpgradeTableComponent extends BaseTableComponent<ItemUpgradeData & {
    shop?: { url: string; displayName: string }
}> implements OnInit {
    protected readonly BASE_DISPLAY_COLUMNS: string[] = [
        'icon',
        'displayName',
        'townRank',
        'unlockRequirements',
        'daysDelay',
        'requirements'
    ];

    ngOnInit() {
        if (this._dataSource().length && this._dataSource()[0].shop) {
            this.displayedColumns.splice(2, 0, 'shop');
            this.displayHeaderColumns = this.displayedColumns.filter(column => column !== 'icon')
        }
    }
}
