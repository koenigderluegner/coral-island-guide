export interface RawMusuemChecklist {
    "item": {
        "data": {
            "DataTable": {
                "ObjectName": string
                "ObjectPath": string
            },
            "RowName": string
        },
        "itemID": string
    },
    "category": string
    "description": {
        "CultureInvariantString": null
    },
    "objectMesh": {
        "AssetPathName": string
        "SubPathString": string
    },
    "objectMaterials": [
        {
            "AssetPathName": string
            "SubPathString": string
        }
    ],
    "displayActorType": string
}
