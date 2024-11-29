import { AssetMap } from "../../types/asset-map.type";
import { AssetPath } from "../../types/asset-path.type";

export interface RawAnimal {
    "animalClasses": AssetMap<AssetPath>[   ],
    "requiredRanchBuilding": string;
    "daysNeededToGrow": number;
    "harvestCooldown": number;
    "Produce": {
        "minimumFriendshipLevelToSpawn": number;
        "itemSmall": {
            "data": {
                "DataTable": {
                    "ObjectName": string;
                    "ObjectPath": string;
                },
                "RowName": string;
            },
            "itemID": string;
        },
        "itemMedium": {
            "data": {
                "DataTable": {
                    "ObjectName": string;
                    "ObjectPath": string;
                },
                "RowName": string;
            },
            "itemID": string;
        },
        "itemLarge": {
            "data": {
                "DataTable": {
                    "ObjectName": string;
                    "ObjectPath": string;
                },
                "RowName": string;
            },
            "itemID": string;
        },
        "itemSmallGolden": {
            "data": {
                "DataTable": {
                    "ObjectName": string;
                    "ObjectPath": string;
                },
                "RowName": string;
            },
            "itemID": string;
        },
        "itemMediumGolden": {
            "data": {
                "DataTable": {
                    "ObjectName": string;
                    "ObjectPath": string;
                },
                "RowName": string;
            },
            "itemID": string;
        },
        "itemLargeGolden": {
            "data": {
                "DataTable": {
                    "ObjectName": string;
                    "ObjectPath": string;
                },
                "RowName": string;
            },
            "itemID": string;
        }
    }    [],
    "animalProduceType": string;
    "produceDropLocation": string;
    "baseProduceDropChance": number;
    "incrementProduceDropChance": number;
    "harvestTool": string;
    "itemHarvestTool": {
        "data": {
            "DataTable": {
                "ObjectName": string;
                "ObjectPath": string;
            },
            "RowName": string;
        },
        "itemID": string;
    }
}
