export interface RawAchievement {
    "achievementId": string;
    "achievementTitle": {
        "Namespace": string;
        "Key": string;
        "SourceString": string;
        "LocalizedString": string;
    },
    "achievementDesc": {
        "Namespace": string;
        "Key": string;
        "SourceString": string;
        "LocalizedString": string;
    },
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
