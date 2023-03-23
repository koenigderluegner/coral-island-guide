import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Item } from "@ci/data-types";

@Component({
    selector: 'app-database-gifts',
    templateUrl: './database-gifts.component.html',
    styleUrls: ['./database-gifts.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DatabaseGiftsComponent {

    @Input() item?: Item;

}
