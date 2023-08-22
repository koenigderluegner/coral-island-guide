import { Item } from './item.interface';
import { TagBasedItem } from './tag-based-item.interface';
import { UnlockByMastery } from "./unlock-by-mastery.interface";
import { MinimalItem } from "../types/minimal-item.type";

export interface CraftingRecipe {
    key: string;
    displayName: string;
    amount: number
    ingredients: { item?: MinimalItem, amount: number }[]
    genericIngredients: {
        key: string;
        shouldBeSameItem: boolean,
        amount: number;
        genericItem?: TagBasedItem
    }[],
    category: string;
    craftingUnlock?: UnlockByMastery
    item?: Item
}
