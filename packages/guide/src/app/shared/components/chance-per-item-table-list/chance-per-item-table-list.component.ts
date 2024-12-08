import { Component, input } from '@angular/core';
import { ChancePerItem } from "@ci/data-types";

@Component({
    selector: 'app-chance-per-item-table-list',
    templateUrl: './chance-per-item-table-list.component.html',
    standalone: false
})
export class ChancePerItemTableListComponent {

    readonly chances = input.required<ChancePerItem[]>();
}
