import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Item } from "@ci/data-types";

@Component({
    selector: 'app-database-insects',
    templateUrl: './database-insects.component.html',
    styleUrls: ['./database-insects.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DatabaseInsectsComponent {

    @Input() item?: Item;

}
