import { TimeDateRequirement } from "./time-date-requirement.type";
import { RequirementWithMeta } from "./requirement-with-meta";
import { SpecificDate } from "../../interfaces/specific-date.interface";
import { Season } from "../season.type";
import { RequirementWithoutMeta } from "./requirement-without-meta";
import { Achievement } from "../../interfaces/achievement.interface";
import { MinimalItem } from "../minimal-item.type";

export const QuestFactComparators = ['MoreEqual', 'Equal'] as const
export type QuestFactComparator = typeof QuestFactComparators[number];

export type Requirement = RequirementsWithMeta | RequirementsWithoutMeta


export type RequirementsWithMeta =
    | RequirementWithMeta<'CompleteMining', { mine: string, level: number }>
    | RequirementWithMeta<'CountNPCHeartLevel', { expectedHeartLevel: number }>
    | RequirementWithMeta<'DateSeason', { season: Season; day: number; }>
    | RequirementWithMeta<'DateSeasonRange', { from: SpecificDate, to: SpecificDate; inverted?: boolean }>
    | RequirementWithMeta<'DinoHologramItemRewardClaimed', { dinosaursName: string }>
    | RequirementWithMeta<'FarmHouse', { level: number }>
    | RequirementWithMeta<'HasCookingUtensil', { utensil?: string; inverted?: boolean }>
    | RequirementWithMeta<'HealedCoral', { required: number; }>
    | RequirementWithMeta<'IsAchievementCompleted', { achievement: Achievement }>
    | RequirementWithMeta<'IsCutsceneTriggered', { cutsceneTopic: string }>
    | RequirementWithMeta<'IsGiantUnlocked', { types: number }>
    | RequirementWithMeta<'IsMailRead', { mailId: string, title: string }>
    | RequirementWithMeta<'ItemInInventory', { item: MinimalItem, amount: number, requiredQuality?: string; }>
    | RequirementWithMeta<'ItemWithCategoryInInventory', { categoryName: string; amount: number }>
    | RequirementWithMeta<'MarriageHasProposed', { inverted?: boolean }>
    | RequirementWithMeta<'MasteryLevel', { mastery: string; level: number }>
    | RequirementWithMeta<'MountAcquired', { inverted?: boolean }>
    | RequirementWithMeta<'NPCHeartLevel', { npcKey: string; expectedHeartLevel: number }>
    | RequirementWithMeta<'ObjectState', { id: string; state: string; customName?: string }>
    | RequirementWithMeta<'QuestActive', { questId: string }>
    | RequirementWithMeta<'QuestFact', { factName: string; }>
    | RequirementWithMeta<'QuestFactCompare', { factName: string; value: number; comparator: QuestFactComparator; }>
    | RequirementWithMeta<'ShipToUnlock', { itemsToShip: MinimalItem[], includeAllQualities: boolean; }>
    | RequirementWithMeta<'SpecialItem', { item: MinimalItem }>
    | RequirementWithMeta<'TempleLevel', { level: number }>
    | TimeDateRequirement

export type RequirementsWithoutMeta =
    | RequirementWithoutMeta<'EditorOnly'>
    | RequirementWithoutMeta<'IsMultiplayer'>

export type RequirementMetaForType<T extends RequirementsWithMeta['type']> = Extract<RequirementsWithMeta, { type: T }>['meta'];
