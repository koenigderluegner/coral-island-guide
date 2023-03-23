import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Item } from "@ci/data-types";

@Component({
    selector: 'app-database-crafting',
    templateUrl: './database-crafting.component.html',
    styleUrls: ['./database-crafting.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DatabaseCraftingComponent {

    @Input() item?: Item;

}
