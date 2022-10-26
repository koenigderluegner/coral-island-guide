import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { Quality } from '@ci/data-types';

@Component({
    selector: 'app-item-icon',
    templateUrl: './item-icon.component.html',
    styleUrls: ['./item-icon.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ItemIconComponent {

    @HostBinding('class.app-item-icon') private _setClass = true;


    @Input() itemName?: string | null;
    @Input() quality?: Quality;
}
