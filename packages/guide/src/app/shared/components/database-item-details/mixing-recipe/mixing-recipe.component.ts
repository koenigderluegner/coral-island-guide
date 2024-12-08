import { Component, input } from '@angular/core';
import { ItemMixingRecipeData } from "@ci/data-types";
import { KeyValuePipe } from "@angular/common";
import { ItemListComponent } from "../../item-list/item-list.component";
import { CookingRecipeIngredientsPipe } from "../../../pipes/cooking-recipe-ingredients.pipe";
import { ItemIconComponent } from "../../item-icon/item-icon.component";
import { CastToMinimalItemArrayPipe } from "../../../pipes/cast-to-minimal-item-array.pipe";

@Component({
    selector: 'app-mixing-recipe',
    imports: [
        KeyValuePipe,
        ItemListComponent,
        CookingRecipeIngredientsPipe,
        ItemIconComponent,
        CastToMinimalItemArrayPipe,
    ],
    templateUrl: './mixing-recipe.component.html'
})
export class MixingRecipeComponent {
    mixingRecipe = input.required<ItemMixingRecipeData>()
}
