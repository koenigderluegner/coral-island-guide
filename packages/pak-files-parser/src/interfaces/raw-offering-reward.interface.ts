export interface RawOfferingReward {
    "offeringId": {
        "DataTable": {
            "ObjectName": string
            "ObjectPath": string
        },
        "RowName": string
    },
    "rewardID": string
    "description": {
        "CultureInvariantString": null
    },
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
