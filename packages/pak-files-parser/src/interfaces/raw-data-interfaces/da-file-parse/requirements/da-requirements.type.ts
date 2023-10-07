import { RawIsAchievementCompletedRequirement } from "./is-achivement-completed-requirement.type";
import { RawCountNpcHeartLevelRequirement } from "./count-npc-heart-level-requirement.type";
import { RawEditorOnlyRequirement } from "./editor-only-requirement.type";
import { RawIsCutsceneTriggeredRequirement } from "./is-cutscene-triggered-requirement.type";
import { RawIsGiantUnlockedRequirement } from "./is-giant-unlocked-requirement.type";
import { RawMarriageHasProposedRequirement } from "./marriage-has-proposed-requirement.type";
import { RawQuestFactRequirement } from "./quest-fact-requirement.type";
import { RawSpecialItemRequirement } from "./special-item-requirements.type";
import { RawMountAcquiredRequirement } from "./mount-acquired-requirement.type";
import { RawDateSeasonRangeRequirement } from "./date-season-range-requirement.type";
import { RawQuestActiveRequirement } from "./quest-active-requirement.type";
import { RawTempleLevelRequirement } from "./temple-level-requirement.type";
import { RawItemInInventoryRequirement } from "./item-in-inventory-requirement.type";
import { RawItemWithCategoryInInventoryRequirement } from "./item-with-category-in-inventory-requirement.type";
import { RawObjectStateRequirement } from "./object-state-requirement.type";

export type DaRequirements = RawIsAchievementCompletedRequirement
    | RawCountNpcHeartLevelRequirement
    | RawEditorOnlyRequirement
    | RawIsCutsceneTriggeredRequirement
    | RawIsGiantUnlockedRequirement
    | RawMarriageHasProposedRequirement
    | RawQuestFactRequirement
    | RawSpecialItemRequirement
    | RawMountAcquiredRequirement
    | RawDateSeasonRangeRequirement
    | RawQuestActiveRequirement
    | RawTempleLevelRequirement
    | RawItemInInventoryRequirement
    | RawItemWithCategoryInInventoryRequirement
    | RawObjectStateRequirement
