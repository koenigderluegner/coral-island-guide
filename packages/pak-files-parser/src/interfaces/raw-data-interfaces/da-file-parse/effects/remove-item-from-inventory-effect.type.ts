export type RawRemoteItemFromInventoryEffect = {
    "Type": "C_RemoveItemFromInventoryEffect",
    "Name": string
    "Outer": string
    "Class": "UScriptClass'C_RemoveItemFromInventoryEffect'",
    "Properties": RemoveItem | RemoveCategory
}


type RemoveItem = {
    "itemId": {
        "data": {
            "RowName": string
        },
        "itemID": string
    },
    "quantity": number
}

type RemoveCategory = {
    "removeByCategory": true,
    "itemCategory": {
        "data": {
            "RowName": string
        }
    },
    "quantity": number
}
