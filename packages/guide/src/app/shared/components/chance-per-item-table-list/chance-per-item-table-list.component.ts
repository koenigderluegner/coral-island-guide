import { Component, input } from '@angular/core';
import { ChancePerItem } from "@ci/data-types";
import { ItemIconComponent } from "../item-icon/item-icon.component";

@Component({
    selector: 'app-chance-per-item-table-list',
    templateUrl: './chance-per-item-table-list.component.html',

    imports: [
        ItemIconComponent
    ]
})
export class ChancePerItemTableListComponent {

    readonly chances = input.required<ChancePerItem[]>();
}
