export type RawItemInInventoryRequirement = {
    "Type": "C_ItemInInventoryRequirement",
    "Name": string
    "Outer": string
    "Class": "UScriptClass'C_ItemInInventoryRequirement'",
    "Properties": {
        "inventoryItem": {
            "data": {
                "RowName": string
            },
            "itemID": string
        },
        "expectedAmount"?: number,
        "qualityRequirement"?: {
            "rules": string
        }
    }
}
