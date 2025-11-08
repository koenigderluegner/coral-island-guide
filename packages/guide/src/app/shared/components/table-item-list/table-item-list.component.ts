import { Component } from '@angular/core';
import { ItemListComponent } from "../item-list/item-list.component";
import { ItemIconComponent } from "../item-icon/item-icon.component";
import { RarityIconComponent } from "../rarity-icon/rarity-icon.component";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
    selector: 'app-table-item-list',
    templateUrl: './table-item-list.component.html',

    imports: [
        ItemIconComponent,
        RarityIconComponent,
        TranslatePipe
    ]
})
export class TableItemListComponent extends ItemListComponent {
}
