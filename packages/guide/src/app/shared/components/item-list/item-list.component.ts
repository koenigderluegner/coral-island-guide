import { Component, Input } from '@angular/core';
import { MinimalItem, TagBasedItem } from '@ci/data-types';

type ItemEntry = {
    item?: MinimalItem;
    amount: number
};

type GenericEntry = {
    shouldBeSameItem: boolean,
    amount: number;
    genericItem?: TagBasedItem
};

@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent {
    @Input() itemList?: (ItemEntry | GenericEntry)[];


    protected isGenericEntry(e: ItemEntry | GenericEntry): e is GenericEntry {
        return 'shouldBeSameItem' in e;
    }
}
