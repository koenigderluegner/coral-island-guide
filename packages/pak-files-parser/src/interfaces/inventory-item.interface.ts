export interface InventoryItem {
    "price": number,
    "sellPrice": number,
    "stackable": false,
    "name": {
        "Namespace": string,
        "Key": string,
        "SourceString": string
    },
    "sellAt": [],
    "inventoryDisplayCategory": {
        "Namespace": string
        "Key": string
        "SourceString": string
    },
    "displayKey": string
    "description": {
        "Namespace": string
        "Key": string
        "SourceString": string
    }
}