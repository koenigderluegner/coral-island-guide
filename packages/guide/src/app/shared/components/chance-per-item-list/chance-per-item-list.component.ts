import { Component, input } from '@angular/core';
import { ChancePerItem } from "@ci/data-types";
import { ItemIconComponent } from "../item-icon/item-icon.component";

@Component({
    selector: 'app-chance-per-item-list',
    templateUrl: './chance-per-item-list.component.html',

    imports: [
        ItemIconComponent
    ]
})
export class ChancePerItemListComponent {

    readonly chances = input.required<ChancePerItem[]>();

}
