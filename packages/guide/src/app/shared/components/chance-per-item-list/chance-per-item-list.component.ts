import { Component, Input } from '@angular/core';
import { ChancePerItem } from "@ci/data-types";

@Component({
    selector: 'app-chance-per-item-list',
    templateUrl: './chance-per-item-list.component.html',
    standalone: false
})
export class ChancePerItemListComponent {

    @Input({required: true}) chances!: ChancePerItem[]

}
