export interface RegisteredCrop {
    "growableSeason": string[    ],
    "isTrellisCrop": boolean,
    "scytheRequirement": string,
    "isRegrowable": boolean,
    "regrowableLength": 0,
    "canCombine": true,
    "chanceToCombine": {
        "chance": 5.0
    },
    "pickupableItem": {
        "data": {
            "DataTable": {
                "ObjectName": "DataTable DT_InventoryItems",
                "ObjectPath": "ProjectCoral/Content/ProjectCoral/Core/Data/DT_InventoryItems.0"
            },
            "RowName": "item_21001"
        },
        "itemID": "item_21001"
    },
    "floatiesConfig": {
        "maxDroppedItems": 1,
        "dropData": [
            {
                "itemId": {
                    "data": {
                        "DataTable": {
                            "ObjectName": "DataTable DT_InventoryItems",
                            "ObjectPath": "ProjectCoral/Content/ProjectCoral/Core/Data/DT_InventoryItems.0"
                        },
                        "RowName": "item_21001"
                    },
                    "itemID": "item_21001"
                },
                "dropChance": 100.0,
                "dropRange": {
                    "min": 1,
                    "max": 1
                }
            }
        ]
    },
    "stages": { length: number; }[]
    "overrideExperience": false,
    "overrideExperienceOnHarvest": 0,
    "readableName": "Potato seeds",
    "size": {
        "length": 1,
        "width": 1
    },
    "isManualEntry": false
}