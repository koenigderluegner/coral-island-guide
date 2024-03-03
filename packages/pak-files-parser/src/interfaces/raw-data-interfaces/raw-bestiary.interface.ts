import { SourceString } from "../../types/source-string.type";

export interface RawBestiary {
    "enemyName": SourceString,
    "enemyDesc": SourceString,
    "icon": {
        "AssetPathName": string;
        "SubPathString": string
    },
    "image": {
        "AssetPathName": string;
        "SubPathString": string;
    },
    "enemyDataRow": {
        "DataTable": {
            "ObjectName": string
            "ObjectPath": string
        },
        "RowName": string
    }
}
