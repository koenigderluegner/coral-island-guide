import {
    BaseCrop,
    CookingRecipe,
    CraftingRecipe,
    Enemy,
    FestivalShopItemData,
    Fish,
    GiftingPreferenceKey,
    Item,
    ItemProcessing,
    MinimalNPC
} from "@ci/data-types";
import { UiIcon } from "../enums/ui-icon.enum";

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
    })[];
    asGift?: { pref: { icon: UiIcon, label: string, preferenceField: GiftingPreferenceKey }, npcs: MinimalNPC[] }[]
}
