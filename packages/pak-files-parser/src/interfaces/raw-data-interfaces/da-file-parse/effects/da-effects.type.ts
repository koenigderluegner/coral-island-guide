import { RawAddItemToInventoryEffect } from "./add-item-to-inventory-effect.type";
import { RawBoostMaxStaminaEffect } from "./boost-max-stamina-effect.type";
import { RawUnlockCookingRecipeEffect } from "./unlock-cooking-recipe-effect.type";
import { RawUnlockCraftingRecipeEffect } from "./unlock-crafting-recipe-effect.type";
import { RawSetQuestFactValueEffect } from "./set-quest-fact-value-effect.type";
import { RawUnlockCookingUtensilEffect } from "./unlock-cooking-utensil-effect.type";
import { RawConsumeItemMasterEffect } from "./consume-item-master-effect.type";

export type DaEffects =
    RawAddItemToInventoryEffect
    | RawBoostMaxStaminaEffect
    | RawSetQuestFactValueEffect
    | RawUnlockCookingRecipeEffect
    | RawUnlockCookingUtensilEffect
    | RawUnlockCraftingRecipeEffect
    | RawConsumeItemMasterEffect;
