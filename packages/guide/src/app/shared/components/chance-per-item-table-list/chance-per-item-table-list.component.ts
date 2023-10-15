import { Component, Input } from '@angular/core';
import { ChancePerItem } from "@ci/data-types";

@Component({
    selector: 'app-chance-per-item-table-list',
    templateUrl: './chance-per-item-table-list.component.html',
})
export class ChancePerItemTableListComponent {

    @Input({required: true}) chances!: ChancePerItem[]
}
