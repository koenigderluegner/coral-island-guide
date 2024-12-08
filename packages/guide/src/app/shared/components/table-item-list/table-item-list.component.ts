import { Component } from '@angular/core';
import { ItemListComponent } from "../item-list/item-list.component";
import { ItemIconComponent } from "../item-icon/item-icon.component";
import { RarityIconComponent } from "../rarity-icon/rarity-icon.component";

@Component({
    selector: 'app-table-item-list',
    templateUrl: './table-item-list.component.html',

    imports: [
        ItemIconComponent,
        RarityIconComponent
    ]
})
export class TableItemListComponent extends ItemListComponent {
}
