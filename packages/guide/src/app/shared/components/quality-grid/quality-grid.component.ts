import { booleanAttribute, Component, input, ViewEncapsulation } from '@angular/core';
import { Item, Quality } from '@ci/data-types';
import { MoneyComponent } from "../money/money.component";
import { ItemIconComponent } from "../item-icon/item-icon.component";

@Component({
    selector: 'app-quality-grid',
    templateUrl: './quality-grid.component.html',
    styleUrls: ['./quality-grid.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'app-quality-grid',
        '[class.!grid-cols-1]': 'showOnlyBase()',
    },

    imports: [
        MoneyComponent,
        ItemIconComponent
    ]
})
export class QualityGridComponent {
    QUALITY = Quality;
    item = input.required<Item>();
    includePrices = input(false, {transform: booleanAttribute});
    showOnlyBase = input(false, {transform: booleanAttribute})

}
