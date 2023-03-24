import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { Item } from "@ci/data-types";

@Component({
    selector: 'app-database-details',
    templateUrl: './database-details.component.html',
    styleUrls: ['./database-details.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DatabaseDetailsComponent {

    @Input() item?: Item;
    @HostBinding('class') private _classes = 'col-span-full database-details';


}
