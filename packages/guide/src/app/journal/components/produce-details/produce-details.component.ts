import { Component, Input } from '@angular/core';
import { Item } from '@ci/data-types';

@Component({
    selector: 'app-produce-details',
    templateUrl: './produce-details.component.html',
    styleUrls: ['./produce-details.component.scss'],
})
export class ProduceDetailsComponent {
    @Input() item?: Item;
}
