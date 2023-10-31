import { SourceString } from "../../types/source-string.type";

export interface RawGiftPreferenceInterface {
    favoritePreferences: RawPreferecne[],
    lovePreferences: RawPreferecne[],
    likePreferences: RawPreferecne[],
    neutralPreferences: RawPreferecne[],
    dislikePreferences: RawPreferecne[],
    hatePreferences: RawPreferecne[],

    [key: string]: RawPreferecne[]
}

interface RawPreferecne {
    "data": {
        "item": {
            "data": {
                "DataTable": {
                    "ObjectName": string,
                    "ObjectPath": string
                },
                "RowName": string
            },
            "itemID": string
        },
        "category": {
            "data": {
                "DataTable": {
                    "ObjectName": string
                    "ObjectPath": string
                },
                "RowName": string
            }
        },
        "tags": string[],
        "dialogueText": SourceString,
        "dialogueBirthdayText": SourceString,
        "emoji": {
            "DataTable": null,
            "RowName": "None"
        },
        "portrait": {
            "DataTable": null,
            "RowName": "None"
        }
    };
}
