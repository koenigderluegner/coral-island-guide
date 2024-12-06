import { Component, Input } from '@angular/core';
import { CraftingRecipe } from '@ci/data-types';

@Component({
    selector: 'app-inventory-details',
    templateUrl: './inventory-details.component.html',
    styleUrls: ['./inventory-details.component.scss'],
    standalone: false
})
export class InventoryDetailsComponent {
    @Input() craftingRecipe?: CraftingRecipe;


}
