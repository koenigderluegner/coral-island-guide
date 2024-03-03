import { MinimalItem } from "@ci/data-types";

export type UnlockCookingRecipeEffect = {
    type: 'UnlockCookingRecipe',
    meta: {
        item: MinimalItem
    }
}
