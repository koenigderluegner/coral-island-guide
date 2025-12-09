import { RawDateSeasonRangeRequirement } from "./date-season-range-requirement.type";
import { RawItemInInventoryRequirement } from "./item-in-inventory-requirement.type";
import { RawQuestFactCompareRequirement } from "./quest-fact-compare-requirement.type";
import { HasCookingUtensilRequirement } from "./has-cooking-utensil-requirement.type";
import { RawDinoHologramItemRewardClaimedRequirement } from "./dino-hologram-item-reward-claimed-requirement.type";
import { RawTimeDateRequirement } from "./time-date-requirement.type";
import { RawRequirementWithMeta } from "./raw-requirement-with-meta";
import { RawRequirementWithoutMeta } from "./raw-requirement-without-meta";
import { AssetPath } from "../../../../types/asset-path.type";
import { ObjectPath } from "../../../../types/object-path.type";
import { DatatableRef } from "../../../../types/datatable-ref.type";
import { Season } from "@ci/data-types";

export type DaRequirements =
    | RawRequirementWithMeta<'IsAchievementCompleted', { achievementId: string }>
    | RawRequirementWithMeta<'CountNPCHeartLevel', { expectedHeartLevel: number }>
    | RawRequirementWithoutMeta<'EditorOnly'>
    | RawRequirementWithMeta<'IsCutsceneTriggered', { cutsceneTopic: string }>
    | RawRequirementWithMeta<'IsGiantUnlocked', { types: number }>
    | RawRequirementWithMeta<'MarriageHasProposed', { invertResult?: true }>
    | RawRequirementWithMeta<'QuestFact', { fact: { factName: { RowName: string } } }>
    | RawRequirementWithMeta<'SpecialItem', { item: { RowName: string } }>
    | RawRequirementWithMeta<'MountAcquired', { invertResult?: true }>
    | RawDateSeasonRangeRequirement
    | RawRequirementWithMeta<'QuestActive', { quest: ObjectPath; questId: string }>
    | RawItemInInventoryRequirement
    | RawRequirementWithMeta<'ItemWithCategoryInInventory', {
    category: { data: { RowName: string } },
    expectedAmount: number
}>
    | RawRequirementWithMeta<'ObjectState', {
    actorRef: AssetPath,
    id: string;
    requiredState: string;
    requiredStateInput: string;
}>
    | RawRequirementWithMeta<'CompleteMining', { miningTheme?: string; requiredLevel: number }>
    | RawQuestFactCompareRequirement
    | RawRequirementWithMeta<'FarmHouse', { requiredLevel: number }>
    | RawRequirementWithMeta<'TempleLevel', { requiredLevel: number }>
    | HasCookingUtensilRequirement
    | RawRequirementWithMeta<'NPCHeartLevel', { NPCId: string; expectedHeartLevel: number }>
    | RawRequirementWithMeta<'HealedCoral', { required: number }>
    | RawRequirementWithMeta<'MasteryLevel', { masteryType: string; expectedMasteryLevel: number }>
    | RawRequirementWithMeta<'IsMailRead', { mailRow: DatatableRef, mailId: string }>
    | RawDinoHologramItemRewardClaimedRequirement
    | RawTimeDateRequirement
    | RawRequirementWithMeta<'DateSeason', {
    expectedDateSeason: { season: `EC_Season::${Season}`; day: number; }
}>

    | RawRequirementWithoutMeta<'IsMultiplayer'>
