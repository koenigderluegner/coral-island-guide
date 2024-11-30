import { SourceString } from "../../types/source-string.type";
import { AssetPath } from "../../types/asset-path.type";

export interface RawBestiary {
    "enemyName": SourceString,
    "enemyDesc": SourceString,
    "icon": AssetPath,
    "image": AssetPath,
    "enemyDataRow": {
        "DataTable": {
            "ObjectName": string
            "ObjectPath": string
        },
        "RowName": string
    }
}
