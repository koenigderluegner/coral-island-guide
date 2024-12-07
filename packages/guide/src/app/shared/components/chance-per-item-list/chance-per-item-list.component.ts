import { Component, input } from '@angular/core';
import { ChancePerItem } from "@ci/data-types";

@Component({
    selector: 'app-chance-per-item-list',
    templateUrl: './chance-per-item-list.component.html',
    standalone: false
})
export class ChancePerItemListComponent {

    readonly chances = input.required<ChancePerItem[]>();

}
