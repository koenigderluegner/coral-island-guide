import { RawIsAchievementCompletedRequirement } from "./is-achivement-completed-requirement.type";
import { RawCountNpcHeartLevelRequirement } from "./count-npc-heart-level-requirement.type";
import { RawEditorOnlyRequirement } from "./editor-only-requirement.type";
import { RawIsCutsceneTriggeredRequirement } from "./is-cutscene-triggered-requirement.type";
import { RawIsGiantUnlockedRequirement } from "./is-giant-unlocked-requirement.type";
import { RawMarriageHasProposedRequirement } from "./marriage-has-proposed-requirement.type";
import { RawQuestFactRequirement } from "./quest-fact-requirement.type";
import { RawSpecialItemRequirement } from "./special-item-requirements.type";
import { RawMountAcquiredRequirement } from "./mount-acquired-requirement.type";

export type DaRequirements = RawIsAchievementCompletedRequirement
    | RawCountNpcHeartLevelRequirement
    | RawEditorOnlyRequirement
    | RawIsCutsceneTriggeredRequirement
    | RawIsGiantUnlockedRequirement
    | RawMarriageHasProposedRequirement
    | RawQuestFactRequirement
    | RawSpecialItemRequirement
    | RawMountAcquiredRequirement
