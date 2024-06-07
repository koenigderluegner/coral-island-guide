import { DatatableRef } from "../../types/datatable-ref.type";

export interface RawShipToUnlockData {
    "item": {
        "data": DatatableRef,
        "itemID": string
    },
    "shipItemList": [
        {
            "data": DatatableRef,
            "itemID": string
        }
    ],
    "totalShipOverride": number,
    "includeAllItemQuality": boolean
}
