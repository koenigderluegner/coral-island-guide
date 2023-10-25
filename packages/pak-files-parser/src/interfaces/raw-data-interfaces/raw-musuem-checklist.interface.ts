import { SourceString } from "../../types/source-string.type";

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
    "description": SourceString,
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
