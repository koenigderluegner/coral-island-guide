import { Component, Input } from '@angular/core';
import { Item } from '@ci/data-types';

@Component({
    selector: 'app-found-details',
    templateUrl: './found-details.component.html',
    styleUrls: ['./found-details.component.scss'],
})
export class FoundDetailsComponent {
    @Input() item?: Item;
}
