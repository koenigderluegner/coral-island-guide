import { EffectWithoutMeta } from './effect-without-meta';
import { EffectWithMeta } from './effect-with-meta';
import { MinimalItem } from '../minimal-item.type';

export type Effect = EffectsWithMeta | EffectsWithoutMeta;

export type EffectsWithoutMeta =
    | EffectWithoutMeta<'BoostMaxHealth'>
    | EffectWithoutMeta<'BoostMaxStamina'>
    | EffectWithoutMeta<'ChangeAppearancePotion'>;

export type EffectsWithMeta =
    | EffectWithMeta<'AddItemToInventory', { quantity?: number; isQuestReward?: boolean; item: MinimalItem }>
    | EffectWithMeta<'ChangeObjectState', { id: string; state: string; customName?: string }>
    | EffectWithMeta<'ConsumeItemMastery', { mastery: string }>
    | EffectWithMeta<'MarkDinoHologramRewardClaimed', { dinoName: string }>
    | EffectWithMeta<'RemoveItemFromInventory', ({ category: string } | { item: MinimalItem }) & { amount: number }>
    | EffectWithMeta<'SendMailToPlayer', { mail: { mailId: string; title: string }; dayDelay: number }>
    | EffectWithMeta<'SetQuestActive', { questId: string }>
    | EffectWithMeta<'SetQuestCompleted', { questId: string }>
    | EffectWithMeta<'SetQuestFactValue', { factName: string }>
    | EffectWithMeta<'UnlockCookingRecipe', { item: MinimalItem }>
    | EffectWithMeta<'UnlockCookingUtensil', { utensil: string }>
    | EffectWithMeta<'UnlockCraftingRecipe', { item: MinimalItem }>
    | EffectWithMeta<'UnlockSpecialItem', { item: MinimalItem }>
    | EffectWithMeta<'UpdateNPCSchedule', { npcIds: string[] }>
    | EffectWithMeta<'VaryMoney', { amount: number }>;

export type EffectMetaForType<T extends EffectsWithMeta['type']> = Extract<EffectsWithMeta, { type: T }>['meta'];
