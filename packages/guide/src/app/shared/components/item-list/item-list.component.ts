import { Component, Input } from '@angular/core';
import { GenericEntry, ItemEntry } from '@ci/data-types';


@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent {
    @Input() itemList?: (ItemEntry | GenericEntry)[];


    protected isGenericEntry(e: ItemEntry | GenericEntry): e is GenericEntry {
        return 'genericItem' in e;
    }
}
