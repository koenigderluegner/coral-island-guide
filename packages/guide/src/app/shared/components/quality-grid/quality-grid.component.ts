import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { Item, Quality } from '@ci/data-types';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'app-quality-grid',
    templateUrl: './quality-grid.component.html',
    styleUrls: ['./quality-grid.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QualityGridComponent {

    @HostBinding('class.app-quality-grid') private _setClass = true;

    QUALITY = Quality;

    @Input() item?: Item;

    @Input()
    get includePrices(): boolean {
        return this._includePrices;
    }

    set includePrices(size: boolean | number | string | null | undefined) {
        this._includePrices = coerceBooleanProperty(size);
    }

    _includePrices = false;

}
