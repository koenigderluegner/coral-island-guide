import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CraftingRecipe } from '@ci/data-types';
import { InventoryCraftingComponent } from "../../../shared/components/database-item-details/inventory-crafting/inventory-crafting.component";
import { DatabaseItemDetailsComponent } from "../../../shared/components/database-item-details/database-item-details.component";
import { DatabaseItemDetailsDirective } from "../../../shared/directives/database-item-details.directive";

@Component({
    selector: 'app-inventory-details',
    templateUrl: './inventory-details.component.html',

    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        InventoryCraftingComponent,
        DatabaseItemDetailsComponent,
        DatabaseItemDetailsDirective
    ]
})
export class InventoryDetailsComponent {

    readonly craftingRecipe = input.required<CraftingRecipe>();


}
