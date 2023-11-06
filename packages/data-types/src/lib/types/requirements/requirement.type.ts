import { MountAcquiredRequirement } from "./mount-acquired-requirement.type";
import { IsAchievementCompletedRequirement } from "./is-achivement-completed-requirement.type";
import { CountNpcHeartLevelRequirement } from "./count-npc-heart-level-requirement.type";
import { EditorOnlyRequirement } from "./editor-only-requirement.type";
import { IsCutsceneTriggeredRequirement } from "./is-cutscene-triggered-requirement.type";
import { IsGiantUnlockedRequirement } from "./is-giant-unlocked-requirement.type";
import { MarriageHasProposedRequirement } from "./marriage-has-proposed-requirement.type";
import { QuestFactRequirement } from "./quest-fact-requirement.type";
import { SpecialItemRequirement } from "./special-item-requirements.type";
import { DateSeasonRangeRequirement } from "./date-season-range-requirement.type";
import { QuestActiveRequirement } from "./quest-active-requirement.type";
import { TempleLevelRequirement } from "./temple-level-requirement.type";
import { ItemInInventoryRequirement } from "./item-in-inventory-requirement.type";
import { ItemWithCategoryInInventoryRequirement } from "./item-with-category-in-inventory-requirement.type";
import { ObjectStateRequirement } from "./object-state-requirement.type";
import { CompleteMiningRequirement } from "./complete-mining-requirement.type";
import { QuestFactCompareRequirement } from "./quest-fact-compare-requirement.type";
import { FarmHouseRequirement } from "./farm-house-requirement.type";
import { HasCookingUtensilRequirement } from "./has-cooking-utensil-requirement.type";
import { NpcHeartLevelRequirement } from "./npc-heart-level-requirement.type";
import { HealedCoralRequirement } from "./healed-coral-requirement.type";
import { MasteryLevelRequirements } from "./mastery-level-requirements.type";
import { IsMailReadRequirement } from "./is-mail-read-requirement.type";

export type Requirement = CountNpcHeartLevelRequirement
    | EditorOnlyRequirement
    | IsAchievementCompletedRequirement
    | IsCutsceneTriggeredRequirement
    | IsGiantUnlockedRequirement
    | MarriageHasProposedRequirement
    | MountAcquiredRequirement
    | QuestFactRequirement
    | SpecialItemRequirement
    | DateSeasonRangeRequirement
    | QuestActiveRequirement
    | TempleLevelRequirement
    | ItemInInventoryRequirement
    | ItemWithCategoryInInventoryRequirement
    | ObjectStateRequirement
    | CompleteMiningRequirement
    | QuestFactCompareRequirement
    | FarmHouseRequirement
    | HasCookingUtensilRequirement
    | NpcHeartLevelRequirement
    | HealedCoralRequirement
    | MasteryLevelRequirements
    | IsMailReadRequirement

