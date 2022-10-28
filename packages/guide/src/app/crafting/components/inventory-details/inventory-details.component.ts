import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CraftingRecipe } from '@ci/data-types';

@Component({
    selector: 'app-inventory-details',
    templateUrl: './inventory-details.component.html',
    styleUrls: ['./inventory-details.component.scss'],
})
export class InventoryDetailsComponent implements OnChanges {
    @Input() craftingRecipe?: CraftingRecipe;

    ngOnChanges(changes: SimpleChanges): void {
        let currentValue: undefined | CraftingRecipe = changes['craftingRecipe']?.currentValue;
        if (currentValue) {
            console.log(currentValue);
        }
    }


}
