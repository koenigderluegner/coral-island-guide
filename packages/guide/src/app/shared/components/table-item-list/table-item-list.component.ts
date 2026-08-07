import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ItemListComponent } from "../item-list/item-list.component";
import { ItemIconComponent } from "../item-icon/item-icon.component";
import { RarityIconComponent } from "../rarity-icon/rarity-icon.component";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
    selector: 'app-table-item-list',
    templateUrl: './table-item-list.component.html',

    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        ItemIconComponent,
        RarityIconComponent,
        TranslatePipe
    ]
})
export class TableItemListComponent extends ItemListComponent {
}
