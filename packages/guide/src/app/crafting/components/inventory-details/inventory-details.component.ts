import { Component, input } from '@angular/core';
import { CraftingRecipe } from '@ci/data-types';

@Component({
    selector: 'app-inventory-details',
    templateUrl: './inventory-details.component.html',
    standalone: false
})
export class InventoryDetailsComponent {

  readonly  craftingRecipe = input.required<CraftingRecipe>();


}
