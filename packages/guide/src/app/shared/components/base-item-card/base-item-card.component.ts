import { Component, Input } from '@angular/core';
import { Item } from '@ci/data-types';

@Component({
    selector: 'app-base-item-card',
    templateUrl: './base-item-card.component.html',
    styleUrls: ['./base-item-card.component.scss'],
})
export class BaseItemCardComponent {
    @Input() item?: Item;
}
