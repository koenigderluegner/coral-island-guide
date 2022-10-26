import { Component, Input } from '@angular/core';
import { Quality } from '@ci/data-types';

@Component({
    selector: 'app-item-icon',
    templateUrl: './item-icon.component.html',
    styleUrls: ['./item-icon.component.scss'],
})
export class ItemIconComponent {

    @Input() itemName: string | null = null;
    @Input() quality?: Quality;
}
