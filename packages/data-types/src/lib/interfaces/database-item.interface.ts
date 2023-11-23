import { CookingRecipe, CraftingRecipe, Enemy, Fish, Item, ItemProcessing } from "@ci/data-types";

export interface DatabaseItem extends Item{
    fish?: Omit<Fish, 'item'>;
    artisanResult?: ItemProcessing[];
    artisanIngredient?: ItemProcessing[];
    fromEnemies?: Enemy[]
    usedToCook?: CookingRecipe[];
    cookedFrom?: CookingRecipe[]
    craftedFrom?: CraftingRecipe[]
    usedToCraft?: CraftingRecipe[]
}
