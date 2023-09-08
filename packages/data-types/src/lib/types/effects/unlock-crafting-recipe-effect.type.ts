import { MinimalItem } from "@ci/data-types";

export type UnlockCraftingRecipeEffect = {
    type: 'UnlockCraftingRecipe',
    meta: {
        item: MinimalItem
    }
}
