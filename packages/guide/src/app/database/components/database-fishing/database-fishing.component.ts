import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Item } from "@ci/data-types";

@Component({
    selector: 'app-database-fishing',
    templateUrl: './database-fishing.component.html',
    styleUrls: ['./database-fishing.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DatabaseFishingComponent {

    @Input() item?: Item;

}
