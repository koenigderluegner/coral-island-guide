import { Component } from '@angular/core';
import { ItemListComponent } from "../item-list/item-list.component";

@Component({
    selector: 'app-table-item-list',
    templateUrl: './table-item-list.component.html',
    styleUrls: ['./table-item-list.component.scss'],
})
export class TableItemListComponent extends ItemListComponent {
}
