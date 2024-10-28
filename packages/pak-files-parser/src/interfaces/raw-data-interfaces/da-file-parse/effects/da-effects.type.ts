import { RawAddItemToInventoryEffect } from "./add-item-to-inventory-effect.type";
import { RawBoostMaxStaminaEffect } from "./boost-max-stamina-effect.type";
import { RawUnlockCookingRecipeEffect } from "./unlock-cooking-recipe-effect.type";
import { RawUnlockCraftingRecipeEffect } from "./unlock-crafting-recipe-effect.type";
import { RawSetQuestFactValueEffect } from "./set-quest-fact-value-effect.type";
import { RawUnlockCookingUtensilEffect } from "./unlock-cooking-utensil-effect.type";
import { RawConsumeItemMasterEffect } from "./consume-item-master-effect.type";
import { RawRemoteItemFromInventoryEffect } from "./remove-item-from-inventory-effect.type";
import { RawSetQuestActiveEffect } from "./set-quest-active-effect.type";
import { RawSetQuestCompletedEffect } from "./set-quest-completed-effect.type";
import { RawVaryMoneyEffect } from "./vary-money-effect.type";
import { RawSendMailToPlayerEffect } from "./send-mail-to-player-effect.type";
import { RawChangeObjectStateEffect } from "./change-object-state-effect.type";
import { RawUpdateNpcScheduleEffect } from "./update-npc-schedule-effect.type";
import { RawUnlockSpecialItemEffect } from "./unlock-special-item-effect.type";
import { RawBoostMaxHealthEffect } from "./boost-max-health-effect.type";
import { RawMarkDinoHologramRewardClaimedEffect } from "./mark-dino-hologram-reward-claimed-effect.type";

export type DaEffects =
    RawAddItemToInventoryEffect
    | RawBoostMaxStaminaEffect
    | RawSetQuestFactValueEffect
    | RawUnlockCookingRecipeEffect
    | RawUnlockCookingUtensilEffect
    | RawUnlockCraftingRecipeEffect
    | RawConsumeItemMasterEffect
    | RawRemoteItemFromInventoryEffect
    | RawSetQuestActiveEffect
    | RawSetQuestCompletedEffect
    | RawVaryMoneyEffect
    | RawSendMailToPlayerEffect
    | RawChangeObjectStateEffect
    | RawUpdateNpcScheduleEffect
    | RawUnlockSpecialItemEffect
    | RawBoostMaxHealthEffect
    | RawMarkDinoHologramRewardClaimedEffect
