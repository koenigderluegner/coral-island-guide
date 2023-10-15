export interface RawEnemyData {
    "animalClass": {
        "ObjectName": string
        "ObjectPath": string
    },
    "possibleEnemiesDrops": {
        "dropItem": {
            "data": {
                "DataTable": {
                    "ObjectName": string
                    "ObjectPath": string
                },
                "RowName": string
            },
            "itemID": string
        },
        "dropChance": number
    }        [ ],
    "experiencePoint": number
    "healthLevelModifier": {
        "ObjectName": string
        "ObjectPath": string
    },
    "attackLevelModifier": {
        "ObjectName": string
        "ObjectPath": string
    },
    "defenseLevelModifier": null
}
