import { AssetMap } from "../../types/asset-map.type";
import { ItemDatatableRef } from "../../types/item-datatable-ref";

type UnlockRecipe = {
    "craftingList": [
        {
            "useCustomID": boolean,
            "item": ItemDatatableRef,
            "customID": string
        }
    ]
};

export interface RawUnlockByMastery {
    "masteryLevel": number,
    "desc": string,
    "unlockRecipe": AssetMap<UnlockRecipe>

}
