import { booleanAttribute, Component, HostBinding, input, ViewEncapsulation } from '@angular/core';
import { Item, Quality } from '@ci/data-types';

@Component({
    selector: 'app-quality-grid',
    templateUrl: './quality-grid.component.html',
    styleUrls: ['./quality-grid.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QualityGridComponent {

    QUALITY = Quality;
    item = input.required<Item>();
    includePrices = input(false, {transform: booleanAttribute});
    @HostBinding('class.!grid-cols-1')
    showOnlyBase = input(false, {transform: booleanAttribute})
    @HostBinding('class.app-quality-grid') private _setClass = true;


}
