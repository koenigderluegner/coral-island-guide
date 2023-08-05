import { booleanAttribute, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { Item, Quality } from '@ci/data-types';

@Component({
    selector: 'app-quality-grid',
    templateUrl: './quality-grid.component.html',
    styleUrls: ['./quality-grid.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QualityGridComponent {

    QUALITY = Quality;
    @Input({required: true}) item!: Item;
    @Input({transform: booleanAttribute}) includePrices = false;
    @HostBinding('class.!grid-cols-1')
    @Input({transform: booleanAttribute}) showOnlyBase = false;
    @HostBinding('class.app-quality-grid') private _setClass = true;


}
