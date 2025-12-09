import { InventoryItemEngineInterface } from './inventory-item-engine.interface';
import { AssetMap } from "../types/asset-map.type";
import { ObjectPath } from "../types/object-path.type";

export interface InventoryItemsEngineInterface {
    "Type": string;
    "Name": string;
    "Properties": {
        "dataMap": AssetMap<InventoryItemEngineInterface> | AssetMap<InventoryItemEngineInterface>[]
    }
    "decoratorConfig":ObjectPath,
    "inventoryDT": ObjectPath,
    "floatiesCategoryDT": ObjectPath,
    "defaultIcon": ObjectPath
}
