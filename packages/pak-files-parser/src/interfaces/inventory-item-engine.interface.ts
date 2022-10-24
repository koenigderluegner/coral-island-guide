export interface InventoryItemEngineInterface {
    "usage": string;
    "toolType": string;
    "category": {
        "data": {
            "DataTable": {
                "ObjectName": string;
                "ObjectPath": string;
            },
            "RowName": string;
        }
    },
    "tags": string[],
    "icon": {
        "ObjectName": string;
        "ObjectPath": string;
    },
    "mesh": {
        "AssetPathName": string;
        "SubPathString": string;
    },
    "soundEventOnPickup": null,
    "categoryFloatiesDropClass": {
        "AssetPathName": string;
        "SubPathString": string;
    },
    "overrideFloatiesDropClass": {
        "AssetPathName": string;
        "SubPathString": string;
    }
}