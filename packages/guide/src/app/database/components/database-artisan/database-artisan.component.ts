import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Item } from "@ci/data-types";

@Component({
    selector: 'app-database-artisan',
    templateUrl: './database-artisan.component.html',
    styleUrls: ['./database-artisan.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DatabaseArtisanComponent {

    @Input() item?: Item;

}
