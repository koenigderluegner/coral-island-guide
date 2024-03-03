import { EnumString } from "@ci/data-types";

export interface RawFishingMinigame {
    "difficultyPreset": null,
    "fishPattern": EnumString<string>
    "fishPatternSpeed": number
    "fishDifficultyCategory": EnumString<string>
    "overridePresetConfig": boolean,
    "fishForce": number
    "fishRunSpeed": number
    "fishBehaviourData": {
        "IsRunning": boolean,
        "Duration": number
    }    [],
    "overrideFishHP": boolean,
    "newFishHP": number
}
