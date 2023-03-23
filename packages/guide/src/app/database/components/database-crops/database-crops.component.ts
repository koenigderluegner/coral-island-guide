import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Item } from "@ci/data-types";

@Component({
    selector: 'app-database-crops',
    templateUrl: './database-crops.component.html',
    styleUrls: ['./database-crops.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DatabaseCropsComponent {

    @Input() item?: Item;

}
