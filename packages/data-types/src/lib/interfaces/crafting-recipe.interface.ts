import { Item } from './item.interface';
import { TagBasedItem } from './tag-based-item.interface';
import { UnlockByMastery } from "./crafting-unlock-by-mastery.interface";

export interface CraftingRecipe {
    key: string;
    displayName: string;
    amount: number
    ingredients: { item?: Item, amount: number }[]
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
