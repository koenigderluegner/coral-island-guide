export interface BugAndInsect {
    "bugType": {
        "ObjectName": string
        "ObjectPath": string
    } | {
        "AssetPathName": string
        "SubPathString": string
    },
    "BugsAndInsectsSKU": {
        // "data": {
        //     "DataTable": {
        //         "ObjectName": "DataTable DT_InventoryItems",
        //         "ObjectPath": "ProjectCoral/Content/ProjectCoral/Core/Data/DT_InventoryItems.0"
        //     },
        //     "RowName": "item_131001"
        // },
        "itemID": string;
    },
    "rarity": string;
    "minCaughtSize": number;
    "maxCaughtSize": number;
    "bugsBehaviourPreset": {
        // "DataTable": {
        //     "ObjectName": "DataTable DT_BugsDifficulty",
        //     "ObjectPath": "ProjectCoral/Content/ProjectCoral/Bugs/DT_BugsDifficulty.0"
        // },
        "RowName": "Version2_Medium"
    }
}
