import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { Quality } from '@ci/data-types';
import { coerceNumberProperty } from "@angular/cdk/coercion";

@Component({
    selector: 'app-item-icon',
    templateUrl: './item-icon.component.html',
    styleUrls: ['./item-icon.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ItemIconComponent {

    @HostBinding('class.app-item-icon') private _setClass = true;


    @Input() itemName?: string | null;
    @Input() subIconName?: string | null;
    @Input() quality?: Quality;

    @Input()
    get amount(): number {
        return this._amount;
    }

    set amount(size: boolean | number | string | null | undefined) {
        this._amount = coerceNumberProperty(size);
    }

    _amount = 0;

}
