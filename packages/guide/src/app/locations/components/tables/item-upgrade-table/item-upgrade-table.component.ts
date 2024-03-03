import { Component } from '@angular/core';
import { BaseTableComponent } from "../../../../shared/components/base-table/base-table.component";
import { ItemUpgradeData } from "@ci/data-types";

@Component({
    selector: 'app-item-upgrade-table',
    templateUrl: './item-upgrade-table.component.html',
})
export class ItemUpgradeTableComponent extends BaseTableComponent<ItemUpgradeData & {
    shop?: { url: string; displayName: string }
}> {
    protected readonly BASE_DISPLAY_COLUMNS: string[] = [
        'icon',
        'displayName',
        'townRank',
        'unlockRequirements',
        'daysDelay',
        'requirements'
    ];

    override ngOnInit() {
        super.ngOnInit();
        if (this.dataSource.length && this.dataSource[0].shop) {
            this.displayedColumns.splice(2, 0, 'shop');
            this.displayHeaderColumns = this.displayedColumns.filter(column => column !== 'icon')
        }
    }
}
