import { MinimalItem } from '../minimal-item.type';

export type UnlockCookingRecipeEffect = {
    type: 'UnlockCookingRecipe',
    meta: {
        item: MinimalItem
    }
}
