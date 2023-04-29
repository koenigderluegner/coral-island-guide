import { SourceString } from "../types/source-string.type";

export interface InventoryItem {
    "price": number,
    "sellPrice": number,
    "stackable": false,
    "name": SourceString,
    "sellAt": [],
    "inventoryDisplayCategory": SourceString,
    "displayKey": string
    "description": {
        "Namespace": string
        "Key": string
        "SourceString": string
    }
}
