import { Pipe, PipeTransform } from '@angular/core';
import { CraftingRecipe } from "@ci/data-types";
import { ItemListComponent } from "../components/item-list/item-list.component";

@Pipe({
    name: 'craftingRecipeIngredients'
})
export class CraftingRecipeIngredientsPipe implements PipeTransform {

    transform(value: CraftingRecipe): ItemListComponent["itemList"] {
        return [...value.ingredients, ...value.genericIngredients];
    }

}
