import { Item } from './item.interface';

export interface CraftingRecipe {
    key: string;
    displayName: string;
    amount: number
    ingredients: { item?: Item, amount: number }[]
    genericIngredients: [],
    category: string;
}