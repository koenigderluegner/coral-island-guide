import { Component, input } from '@angular/core';
import { CraftingRecipe } from '@ci/data-types';
import { InventoryCraftingComponent } from "../../../shared/components/database-item-details/inventory-crafting/inventory-crafting.component";
import { DatabaseItemDetailsComponent } from "../../../shared/components/database-item-details/database-item-details.component";
import { DatabaseItemDetailsDirective } from "../../../shared/directives/database-item-details.directive";

@Component({
    selector: 'app-inventory-details',
    templateUrl: './inventory-details.component.html',

    imports: [
        InventoryCraftingComponent,
        DatabaseItemDetailsComponent,
        DatabaseItemDetailsDirective
    ]
})
export class InventoryDetailsComponent {

    readonly craftingRecipe = input.required<CraftingRecipe>();


}
