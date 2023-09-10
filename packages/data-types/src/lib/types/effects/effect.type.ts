import { AddItemToInventoryEffect } from "./add-item-to-inventory-effect.type";
import { BoostMaxStaminaEffect } from "./boost-max-stamina-effect.type";
import { UnlockCookingRecipeEffect } from "./unlock-cooking-recipe-effect.type";
import { UnlockCraftingRecipeEffect } from "./unlock-crafting-recipe-effect.type";
import { SetQuestFactValueEffect } from "./set-quest-fact-value-effect.type";
import { UnlockCookingUtensilEffect } from "./unlock-cooking-utensil-effect.type";

export type Effect =
    AddItemToInventoryEffect
    | BoostMaxStaminaEffect
    | SetQuestFactValueEffect
    | UnlockCookingRecipeEffect
    | UnlockCookingUtensilEffect
    | UnlockCraftingRecipeEffect;
