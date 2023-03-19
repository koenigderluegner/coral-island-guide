import { Item, MinimalItem, TagBasedItem, UnlockByMastery } from "@ci/data-types";

export interface CookingRecipe {
    key: string;
    amount: number
    ingredients: { item?: MinimalItem, amount: number }[]
    genericIngredients: {
        key: string;
        amount: number;
        genericItem?: TagBasedItem
    }[],
    craftingUnlock?: UnlockByMastery
    item?: Item
    utensils: string[]
    eitherOrIngredients: { item?: MinimalItem, amount: number }[][]
    additionsToGenerics?: Record<string, MinimalItem[]>
}
