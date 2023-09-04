export interface RawFruitPlant {
    "growableSeason": string[],
    "stages":
        {
            "length": number,
            "healthPoint": number,
            "fruitPlantMesh": {
                "ObjectName": string;
                "ObjectPath": string;
            }
        }[],
    "regrowingStageData": {
        "length": number,
        "healthPoint": number,
        "fruitPlantMesh": {
            "ObjectName": string;
            "ObjectPath": string;
        }
    },
    "fruitsFloaties": {
        "maxDroppedItems": number,
        "dropData": {
            "itemId": {
                "data": {
                    "DataTable": {
                        "ObjectName": string;
                        "ObjectPath": string;
                    },
                    "RowName": string;
                },
                "itemID": string;
            },
            "dropChance": number,
            "dropRange": {
                "min": number,
                "max": number
            }
        }        [],
        "dropRequirement": null
    },
    "overrideExperience": boolean,
    "overrideExperienceOnHarvest": number,
    "emitterOnPlanted": null,
    "nonMaturedStageReactionAnim": {
        "ObjectName": string;
        "ObjectPath": string;
    },
    "maturedStageReactionAnim": {
        "ObjectName": string;
        "ObjectPath": string;
    },
    "seedStageReactionFX": null,
    "plantStageReactionFX": {
        "ObjectName": string;
        "ObjectPath": string;
    },
    "readableName": string;
    "size": {
        "length": number;
        "width": number;
    },
    "isManualEntry": boolean
}
