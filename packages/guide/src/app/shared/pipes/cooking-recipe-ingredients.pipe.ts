import { Pipe, PipeTransform } from '@angular/core';
import { ItemListComponent } from "../components/item-list/item-list.component";
import { CookingRecipe, GenericEntry, ItemEntry } from "@ci/data-types";

@Pipe({
    name: 'cookingRecipeIngredients'
})
export class CookingRecipeIngredientsPipe implements PipeTransform {

    transform(cookingRecipe: CookingRecipe): (ItemEntry | GenericEntry)[] {
        const items: ReturnType<ItemListComponent['itemList']> = [...cookingRecipe.ingredients];

        if (cookingRecipe.genericIngredients.length) {

            cookingRecipe.genericIngredients.forEach(genericIngredient => {
                const genericInput: GenericEntry = {
                    shouldBeSameItem: false,
                    amount: genericIngredient.amount,
                    genericItem: genericIngredient.genericItem
                }

                items.push(genericInput)
            });
        }

        return items;
    }

}
