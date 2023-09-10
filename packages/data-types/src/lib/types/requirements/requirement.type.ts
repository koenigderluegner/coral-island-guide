import { MountAcquiredRequirement } from "./mount-acquired-requirement.type";
import { IsAchievementCompletedRequirement } from "./is-achivement-completed-requirement.type";
import { CountNpcHeartLevelRequirement } from "./count-npc-heart-level-requirement.type";
import { EditorOnlyRequirement } from "./editor-only-requirement.type";
import { IsCutsceneTriggeredRequirement } from "./is-cutscene-triggered-requirement.type";
import { IsGiantUnlockedRequirement } from "./is-giant-unlocked-requirement.type";
import { MarriageHasProposedRequirement } from "./marriage-has-proposed-requirement.type";
import { QuestFactRequirement } from "./quest-fact-requirement.type";
import { SpecialItemRequirement } from "./special-item-requirements.type";

export type Requirement = CountNpcHeartLevelRequirement
    | EditorOnlyRequirement
    | IsAchievementCompletedRequirement
    | IsCutsceneTriggeredRequirement
    | IsGiantUnlockedRequirement
    | MarriageHasProposedRequirement
    | MountAcquiredRequirement
    | QuestFactRequirement
    | SpecialItemRequirement

