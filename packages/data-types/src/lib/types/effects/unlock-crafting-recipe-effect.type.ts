import { MinimalItem } from '../minimal-item.type';

export type UnlockCraftingRecipeEffect = {
    type: 'UnlockCraftingRecipe',
    meta: {
        item: MinimalItem
    }
}
