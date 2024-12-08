import { Component, input } from '@angular/core';
import { GenericEntry, ItemEntry } from '@ci/data-types';


@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.component.html',
    standalone: false
})
export class ItemListComponent {

    readonly itemList = input.required<(ItemEntry | GenericEntry)[]>();

    protected isGenericEntry(e: ItemEntry | GenericEntry): e is GenericEntry {
        return 'genericItem' in e;
    }

}
