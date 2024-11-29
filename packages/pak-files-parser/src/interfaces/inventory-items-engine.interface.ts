import { InventoryItemEngineInterface } from './inventory-item-engine.interface';
import { AssetMap } from "../types/asset-map.type";

export interface InventoryItemsEngineInterface {
    "Type": string;
    "Name": string;
    "Properties": {
        "dataMap": AssetMap<InventoryItemEngineInterface> | AssetMap<InventoryItemEngineInterface>[]
    }
    "decoratorConfig": {
        "ObjectName": string
        "ObjectPath": string
    },
    "inventoryDT": {
        "ObjectName": string
        "ObjectPath": string
    },
    "floatiesCategoryDT": {
        "ObjectName": string
        "ObjectPath": string
    },
    "defaultIcon": {
        "ObjectName": string
        "ObjectPath": string
    }
}
