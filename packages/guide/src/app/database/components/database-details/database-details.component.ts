import { Component, Input } from '@angular/core';
import { Item } from "@ci/data-types";

@Component({
    selector: 'app-database-details',
    templateUrl: './database-details.component.html',
    styleUrls: ['./database-details.component.scss'],
})
export class DatabaseDetailsComponent {

    @Input() item?: Item;


}
