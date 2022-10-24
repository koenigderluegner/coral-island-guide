import { InventoryItem } from './inventory-item.interface';

export interface InventoryItemsInterface {
    "Type": string,
    "Name": string,
    "Properties": {
        "RowStruct": {
            "ObjectName": string
            "ObjectPath": string
        }
    },
    "Rows": {
        [key: string]: InventoryItem
    }
}