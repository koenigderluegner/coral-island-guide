import { Component, input } from '@angular/core';
import { GenericEntry, ItemEntry } from '@ci/data-types';
import { ItemIconComponent } from "../item-icon/item-icon.component";


@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.component.html',

    imports: [
        ItemIconComponent
    ]
})
export class ItemListComponent {

    readonly itemList = input.required<(ItemEntry | GenericEntry)[]>();

    protected isGenericEntry(e: ItemEntry | GenericEntry): e is GenericEntry {
        return 'genericItem' in e;
    }

}
