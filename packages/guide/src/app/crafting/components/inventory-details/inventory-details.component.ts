import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CraftingRecipe } from '@ci/data-types';
import { ItemListComponent } from '../../../shared/components/item-list/item-list.component';

@Component({
    selector: 'app-inventory-details',
    templateUrl: './inventory-details.component.html',
    styleUrls: ['./inventory-details.component.scss'],
})
export class InventoryDetailsComponent implements OnChanges {
    @Input() craftingRecipe?: CraftingRecipe;
    protected itemList: ItemListComponent['itemList'];

    ngOnChanges(changes: SimpleChanges): void {
        let currentValue: undefined | CraftingRecipe = changes['craftingRecipe']?.currentValue;
        if (currentValue) {
            this.itemList = [...currentValue.ingredients, ...currentValue.genericIngredients];
        }
    }


}
