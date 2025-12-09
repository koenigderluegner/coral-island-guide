import { ObjectPath } from "../../types/object-path.type";
import { ItemDatatableRef } from "../../types/item-datatable-ref";

export interface RawFruitTree {
    "producingSeason": string;
    "stages": {
        "length": number;
        "healthPoint": number;
        "fruitTreeData": ObjectPath,
        "floatiesOnDestroyed": {
            "maxDroppedItems": number;
            "dropData": [],
            "dropRequirement": null
        }
    }[        ],
    "meshesForFruits": ObjectPath[],
    "fruitsFloaties": {
        "maxDroppedItems": number;
        "dropData": {
            "itemId": ItemDatatableRef,
            "dropChance": number;
            "dropRange": {
                "min": number;
                "max": number;
            }
        }[],
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
