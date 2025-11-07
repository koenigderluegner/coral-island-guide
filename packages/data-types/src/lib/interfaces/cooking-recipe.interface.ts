import { Item } from './item.interface';
import { MinimalItem } from '../types/minimal-item.type';
import { MinimalTagBasedItem } from '../types/minimal-tag-based-item.type';
import { UnlockByMastery } from './unlock-by-mastery.interface';

export interface CookingRecipe {
    key: string;
    amount: number
    cookingKey: string;
    ingredients: { item?: MinimalItem, amount: number }[]
    genericIngredients: {
        key: string;
        amount: number;
        genericItem?: MinimalTagBasedItem
    }[],
    craftingUnlock?: UnlockByMastery
    item: Item
    utensils: string[]
    eitherOrIngredients: { item?: MinimalItem, amount: number }[][]
    additionsToGenerics?: Record<string, MinimalItem[]>
}
