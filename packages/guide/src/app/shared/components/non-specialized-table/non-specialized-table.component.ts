import { Component } from '@angular/core';
import { BaseTableComponent } from "../base-table/base-table.component";
import { Item } from "@ci/data-types";

@Component({
    selector: 'app-non-specialized-table',
    templateUrl: './non-specialized-table.component.html',
})
export class NonSpecializedTableComponent extends BaseTableComponent<Item> {
    protected readonly BASE_DISPLAY_COLUMNS: string[] = [
        'icon',
        'displayName',
        'sellPrice'
    ];

    override sortingDataAccessor = (item: NonSpecializedTableComponent['dataSource'][0], property: string) => {
        const sortHelperValue = this.sortHelper(item, property)

        return sortHelperValue ?? 0;
    };

}
