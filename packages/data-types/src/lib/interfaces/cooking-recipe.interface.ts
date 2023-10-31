import { Item, MinimalItem, MinimalTagBasedItem, UnlockByMastery } from "@ci/data-types";

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
