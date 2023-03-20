export interface RawFruitTree {
    "producingSeason": string;
    "stages": {
        "length": number;
        "healthPoint": number;
        "fruitTreeData": {
            "ObjectName": string;
            "ObjectPath": string;
        },
        "floatiesOnDestroyed": {
            "maxDroppedItems": number;
            "dropData": [],
            "dropRequirement": null
        }
    }[        ],
    "meshesForFruits": {
        "ObjectName": string;
        "ObjectPath": string;
    }    [],
    "fruitsFloaties": {
        "maxDroppedItems": number;
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
            "dropChance": number;
            "dropRange": {
                "min": number;
                "max": number;
            }
        }        [ ],
        "dropRequirement": null
    },
    "overrideExperience": false,
    "overrideExperienceOnHarvest": 0,
    "hasStump": false,
    "stumpData": {
        "meshData": null,
        "healthPoint": number;
        "floatiesOnDestroyed": {
            "maxDroppedItems": number;
            "dropData": [],
            "dropRequirement": null
        }
    },
    "emitterOnPlanted": null,
    "readableName": string;
    "size": {
        "length": number;
        "width": number;
    },
    "isManualEntry": boolean
}
