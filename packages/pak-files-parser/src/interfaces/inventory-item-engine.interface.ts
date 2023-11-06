import { AssetPath } from "../types/asset-path.type";
import { DatatableRef } from "../types/datatable-ref.type";

export interface InventoryItemEngineInterface {
    "usage": string;
    "toolType": string;
    "category": {
        "data": DatatableRef
    },
    "tags": string[],
    "icon": AssetPath,
    "mesh": AssetPath
    "soundEventOnPickup": null,
    "categoryFloatiesDropClass": AssetPath
    "overrideFloatiesDropClass": AssetPath
}
