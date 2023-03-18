import { readAsset } from '../util/functions';
import { CraftingRecipes } from '../types/crafting-recipes.type';
import { RawCraftingRecipe } from '../interfaces/crafting-recipe.interface';
import { CraftingRecipe, Item, UnlockByMastery } from '@ci/data-types';

export class CraftingRecipeDbGenerator {

    recipesDB: CraftingRecipes[];

    constructor(protected itemMap: Map<string, Item>, protected craftingUnlockMap: Map<string, UnlockByMastery>) {

        // ProjectCoral Content Project Coral Core Data Crafting
        this.recipesDB = readAsset<CraftingRecipes[]>('DT_CraftingRecipes.json');

    }

    generate(): Map<string, CraftingRecipe> {
        const map: Map<string, CraftingRecipe> = new Map<string, CraftingRecipe>();

        Object.keys(this.recipesDB[0]?.Rows).forEach(itemKey => {

            const dbItem: RawCraftingRecipe = this.recipesDB[0]?.Rows[itemKey];

            const craftingRecipe: CraftingRecipe = {
                key: itemKey,
                displayName: dbItem.readableName,
                amount: dbItem.amount,
                ingredients: dbItem.ingredients.map(ingredient => {
                    const item = this.itemMap.get(ingredient.item.itemID);
                    return {item, amount: ingredient.amount};
                }),
                genericIngredients: dbItem.genericIngredients.map(gi => {
                    return {key: gi.genericItem.RowName, amount: gi.amount, shouldBeSameItem: gi.shouldBeSameItem};
                }),
                category: dbItem.dataCategory.RowName,
                craftingUnlock: this.craftingUnlockMap.get(itemKey)
            };

            map.set(itemKey, craftingRecipe);


        });

        return map;
    }
}
