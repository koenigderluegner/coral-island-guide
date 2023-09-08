export type RawAddItemToInventoryEffect = {
    "Type": "C_AddItemToInventoryEffect",
    "Name": string;
    "Outer": string;
    "Class": "UScriptClass'C_AddItemToInventoryEffect'",
    "Properties": {
        "itemData": {
            "data": {
                "RowName": string
            },
            "itemID": string
        },
        "quantity"?: number;

        "isQuestReward"?: boolean
    }
}
