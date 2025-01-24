import { AssetMap } from "../../types/asset-map.type";

type UnlockRecipe = {
    "craftingList": [
        {
            "useCustomID": boolean,
            "item": {
                "data": {
                    "DataTable": {
                        "ObjectName": string,
                        "ObjectPath": string
                    },
                    "RowName": string
                },
                "itemID": string
            },
            "customID": string
        }
    ]
};

export interface RawUnlockByMastery {
    "masteryLevel": number,
    "desc": string,
    "unlockRecipe": AssetMap<UnlockRecipe>

}
