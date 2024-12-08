import { Component } from '@angular/core';
import { ItemListComponent } from "../item-list/item-list.component";

@Component({
    selector: 'app-table-item-list',
    templateUrl: './table-item-list.component.html',
    standalone: false
})
export class TableItemListComponent extends ItemListComponent {
}
