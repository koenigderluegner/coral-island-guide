import { AddItemToInventoryEffect } from "./add-item-to-inventory-effect.type";
import { BoostMaxStaminaEffect } from "./boost-max-stamina-effect.type";
import { UnlockCookingRecipeEffect } from "./unlock-cooking-recipe-effect.type";
import { UnlockCraftingRecipeEffect } from "./unlock-crafting-recipe-effect.type";
import { SetQuestFactValueEffect } from "./set-quest-fact-value-effect.type";
import { UnlockCookingUtensilEffect } from "./unlock-cooking-utensil-effect.type";
import { ConsumeMasteryItemEffect } from "./consume-mastery-item-effect.type";
import { RemoveItemFromInventoryEffect } from "./remove-item-from-inventory-effect.type";
import { SetQuestActiveEffect } from "./set-quest-active-effect.type";
import { SetQuestCompletedEffect } from "./set-quest-completed-effect.type";
import { VaryMoneyEffect } from "./vary-money-effect.type";
import { SendMailToPlayerEffect } from "./send-mail-to-player-effect.type";
import { ChangeObjectStateEffect } from "./change-object-state-effect.type";
import { UpdateNpcScheduleEffect } from "./update-npc-schedule-effect.type";
import { UnlockSpecialItemEffect } from "./unlock-special-item-effect.type";
import { BoostMaxHealthEffect } from "./boost-max-health-effect.type";

export type Effect =
    AddItemToInventoryEffect
    | BoostMaxStaminaEffect
    | SetQuestFactValueEffect
    | UnlockCookingRecipeEffect
    | UnlockCookingUtensilEffect
    | UnlockCraftingRecipeEffect
    | ConsumeMasteryItemEffect
    | RemoveItemFromInventoryEffect
    | SetQuestActiveEffect
    | SetQuestCompletedEffect
    | VaryMoneyEffect
    | SendMailToPlayerEffect
    | ChangeObjectStateEffect
    | UpdateNpcScheduleEffect
    | UnlockSpecialItemEffect
    | BoostMaxHealthEffect

