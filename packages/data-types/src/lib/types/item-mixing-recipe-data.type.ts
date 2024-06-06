import { MinimalItem } from "./minimal-item.type";
import { MinimalTagBasedItem } from "./minimal-tag-based-item.type";

export type ItemMixingRecipeData = {
    key: string;
    amount: number
    cookingKey: string;
    ingredients: { item?: MinimalItem, amount: number }[]
    genericIngredients: {
        key: string;
        amount: number;
        genericItem?: MinimalTagBasedItem
    }[],
    item: MinimalItem
    eitherOrIngredients: { item?: MinimalItem, amount: number }[][]
    additionsToGenerics?: Record<string, MinimalItem[]>
}
