import { SourceString } from "../../types/source-string.type";

export interface RawOfferingReward {
    "offeringId": {
        "DataTable": {
            "ObjectName": string
            "ObjectPath": string
        },
        "RowName": string
    },
    "rewardID": string
    "description": SourceString,
    "useItemMesh": boolean,
    "scaleItemMesh": boolean,
    "rewardItem": {
        "data": {
            "DataTable": {
                "ObjectName": string
                "ObjectPath": string
            },
            "RowName": string
        },
        "itemID": string;
    },
    "rewardMesh": null
}
