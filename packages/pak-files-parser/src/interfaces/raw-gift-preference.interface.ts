export interface RawGiftPreferenceInterface {
    favoritePreferences: RawPreferecne[],
    lovePreferences: RawPreferecne[],
    likePreferences: RawPreferecne[],
    neutralPreferences: RawPreferecne[],
    dislikePreferences: RawPreferecne[],
    hatePreferences: RawPreferecne[],


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
        "dialogueText": {
            "CultureInvariantString": null
        },
        "dialogueBirthdayText": {
            "CultureInvariantString": null
        },
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