import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { DatabaseItem } from "@ci/data-types";
import { ItemListComponent } from "../../item-list/item-list.component";
import { CraftingRecipeIngredientsPipe } from "../../../pipes/crafting-recipe-ingredients.pipe";

@Component({
    selector: 'app-inventory-crafting',
    imports: [
        ItemListComponent,
        CraftingRecipeIngredientsPipe
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './inventory-crafting.component.html'
})
export class InventoryCraftingComponent {
    readonly details = input.required<DatabaseItem>();
}
