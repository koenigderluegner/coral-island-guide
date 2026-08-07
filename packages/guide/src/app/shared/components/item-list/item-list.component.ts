import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { GenericEntry, ItemEntry } from '@ci/data-types';
import { ItemIconComponent } from "../item-icon/item-icon.component";
import { TranslatePipe } from "@ngx-translate/core";


@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.component.html',

    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        ItemIconComponent,
        TranslatePipe
    ]
})
export class ItemListComponent {

    readonly itemList = input.required<(ItemEntry | GenericEntry)[]>();

    protected isGenericEntry(e: ItemEntry | GenericEntry): e is GenericEntry {
        return 'genericItem' in e;
    }

}
