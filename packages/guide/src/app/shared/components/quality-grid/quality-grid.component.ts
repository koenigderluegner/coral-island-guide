import { booleanAttribute, Component, input, ViewEncapsulation } from '@angular/core';
import { Item, Quality } from '@ci/data-types';

@Component({
    selector: 'app-quality-grid',
    templateUrl: './quality-grid.component.html',
    styleUrls: ['./quality-grid.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'app-quality-grid',
        '[class.!grid-cols-1]': 'showOnlyBase()',
    },
    standalone: false
})
export class QualityGridComponent {
    QUALITY = Quality;
    item = input.required<Item>();
    includePrices = input(false, {transform: booleanAttribute});
    showOnlyBase = input(false, {transform: booleanAttribute})

}
