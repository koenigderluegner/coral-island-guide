export type RawUnlockSpecialItemEffect = {
    "Type": "C_UnlockSpecialItemEffect",
    "Name": string,
    "Outer": string,
    "Class": "UScriptClass'C_UnlockSpecialItemEffect'",
    "Properties": {
        "item": {
            "DataTable": {
                "ObjectName": string,
                "ObjectPath": string,
            },
            "RowName": string,
        },
        "isQuestReward"?: boolean
    }
}
