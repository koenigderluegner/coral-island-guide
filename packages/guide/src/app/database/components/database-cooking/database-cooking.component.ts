import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Item } from "@ci/data-types";

@Component({
    selector: 'app-database-cooking',
    templateUrl: './database-cooking.component.html',
    styleUrls: ['./database-cooking.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DatabaseCookingComponent {

    @Input() item?: Item;

}
