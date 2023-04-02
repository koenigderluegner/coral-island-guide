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
        'price'
    ];
}
