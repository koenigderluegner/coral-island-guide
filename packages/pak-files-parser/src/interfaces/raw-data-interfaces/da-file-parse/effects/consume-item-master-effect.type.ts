export type RawConsumeItemMasterEffect = {
    "Type": "C_ConsumeItemMasteryEffect",
    "Name": string;
    "Outer": string;
    "Class": "UScriptClass'C_ConsumeItemMasteryEffect'",
    "Properties": {
        "masteryType": string;
        "itemData": {
            "data": {
                "RowName": string;
            },
            "itemID": string;
        },
        "playAnimationTrigger": boolean,
        "animationMontage": {
            "ObjectName": string;
            "ObjectPath": string;
        },
        "sectionName": string;
        "animationSpeed": number;
        "endAnimMontage": {
            "ObjectName": string;
            "ObjectPath": string;
        }
    }
}
