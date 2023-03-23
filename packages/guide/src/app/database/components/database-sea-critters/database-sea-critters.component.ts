import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Item } from "@ci/data-types";

@Component({
    selector: 'app-database-sea-critters',
    templateUrl: './database-sea-critters.component.html',
    styleUrls: ['./database-sea-critters.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DatabaseSeaCrittersComponent {

    @Input() item?: Item;

}
