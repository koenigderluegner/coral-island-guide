import { SourceString } from "../../types/source-string.type";

export interface RawAchievement {
    "achievementId": string;
    "achievementTitle": SourceString,
    "achievementDesc": SourceString,
    "quest": {
        "AssetPathName": string;
        "SubPathString": string;
    },
    "icon": {
        "AssetPathName": string;
        "SubPathString": string;
    },
    "isTrackingProgress": boolean,
    "questCondition": string;
}
