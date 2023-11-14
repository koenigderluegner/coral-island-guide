type AssetInfo = {
    "AssetPathName": string
    "SubPathString": string
};

export interface RawAnimalIcons {
    "animal": {
        "DataTable": {
            "ObjectName": string
            "ObjectPath": string
        },
        "RowName": string
    },
    "icons":
        Record<string, {
            "adult": AssetInfo,
            "adultHappy": AssetInfo
            "adultBadMood": AssetInfo
            "adultSick": AssetInfo
            "adultWinner": AssetInfo
            "adultHappyWinner": AssetInfo
            "adultBadMoodWinner": AssetInfo
            "adultSickWinner": AssetInfo
            "adultSad": AssetInfo
            "baby": AssetInfo
            "babyBadMood": AssetInfo
            "babySick": AssetInfo
            "babySad": AssetInfo
        }>[    ]
}
