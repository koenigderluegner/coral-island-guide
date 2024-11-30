import { AssetPath } from "../../../types/asset-path.type";
import { AssetMap } from "../../../types/asset-map.type";


export interface RawAnimalIcons {
    "animal": {
        "DataTable": {
            "ObjectName": string
            "ObjectPath": string
        },
        "RowName": string
    },
    "icons":AssetMap<{
        "adult": AssetPath,
        "adultHappy": AssetPath
        "adultBadMood": AssetPath
        "adultSick": AssetPath
        "adultWinner": AssetPath
        "adultHappyWinner": AssetPath
        "adultBadMoodWinner": AssetPath
        "adultSickWinner": AssetPath
        "adultSad": AssetPath
        "baby": AssetPath
        "babyBadMood": AssetPath
        "babySick": AssetPath
        "babySad": AssetPath
    }>[    ]
}
