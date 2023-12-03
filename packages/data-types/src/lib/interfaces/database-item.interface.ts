import {
    BaseCrop,
    CookingRecipe,
    CraftingRecipe,
    Enemy,
    FestivalShopItemData,
    Fish,
    Item,
    ItemProcessing
} from "@ci/data-types";

export interface DatabaseItem extends Item{
    fish?: Omit<Fish, 'item'>;
    artisanResult?: ItemProcessing[];
    artisanIngredient?: ItemProcessing[];
    fromEnemies?: Enemy[]
    usedToCook?: CookingRecipe[];
    cookedFrom?: CookingRecipe[]
    craftedFrom?: CraftingRecipe[]
    usedToCraft?: CraftingRecipe[]
    isSeedFor?: BaseCrop[];
    comesFromSeed?: BaseCrop[];
    buyAtFestivalShop?: (FestivalShopItemData & {
        festival: { url: string; displayName: string }
    })[]
}
