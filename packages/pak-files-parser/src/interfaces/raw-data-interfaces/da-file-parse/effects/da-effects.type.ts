import { RawAddItemToInventoryEffect } from "./add-item-to-inventory-effect.type";
import { RawConsumeItemMasterEffect } from "./consume-item-master-effect.type";
import { RawRemoteItemFromInventoryEffect } from "./remove-item-from-inventory-effect.type";
import { RawMarkDinoHologramRewardClaimedEffect } from "./mark-dino-hologram-reward-claimed-effect.type";
import { RawEffectWithoutMeta } from "./raw-effect-without-meta";
import { RawEffectWithMeta } from "./raw-effect-with-meta";
import { DatatableRef } from "../../../../types/datatable-ref.type";
import { ObjectPath } from "../../../../types/object-path.type";
import { AssetPath } from "../../../../types/asset-path.type";

export type DaEffects =
    | RawAddItemToInventoryEffect
    | RawEffectWithMeta<'SetQuestFactValue', { fact: { factName: { RowName: string } } }>
    | RawEffectWithMeta<'UnlockCookingRecipe', { recipe: { RowName: string } }>
    | RawEffectWithMeta<'UnlockCookingUtelsil', { utensilToUnlock: string }>
    | RawEffectWithMeta<'UnlockCraftingRecipe', { recipe: { RowName: string } }>
    | RawConsumeItemMasterEffect
    | RawRemoteItemFromInventoryEffect
    | RawEffectWithMeta<'SetQuestActive', { quest: ObjectPath, questId: string }>
    | RawEffectWithMeta<'SetQuestCompleted', { quest: ObjectPath, questId: string }>
    | RawEffectWithMeta<'VaryMoney', { amount: number, incomeCategory: string[] }>
    | RawEffectWithMeta<'SendMailToPlayer', { mailRow: DatatableRef, mailId: string; dayDelay: number }>
    | RawEffectWithMeta<'ChangeObjectState', {    actorRef: AssetPath,    id: string;    state: string;    stateInput: string}>
    | RawEffectWithMeta<'UpdateNPCSchedule', { forceRefresh: boolean, npcIDs: string[] }>
    | RawEffectWithMeta<'UnlockSpecialItem', { item: DatatableRef, isQuestReward?: boolean }>
    | RawMarkDinoHologramRewardClaimedEffect
    | RawEffectWithoutMeta<'BoostMaxHealth'>
    | RawEffectWithoutMeta<'BoostMaxStamina'>
    | RawEffectWithoutMeta<'ChangeAppearancePotion'>
