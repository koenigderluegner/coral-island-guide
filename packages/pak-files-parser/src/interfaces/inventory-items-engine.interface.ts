import { InventoryItemEngineInterface } from './inventory-item-engine.interface';

export interface InventoryItemsEngineInterface {
    "Type": string;
    "Name": string;
    "Properties": {
        "dataMap": {
            [key: string]: InventoryItemEngineInterface,
        }
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
