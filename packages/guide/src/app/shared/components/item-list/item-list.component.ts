import { Component, Input } from '@angular/core';
import { Item } from '@ci/data-types';

@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent {
    @Input() itemList?: {
        item?: Item;
        amount: number
    }[];
}
