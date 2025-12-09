import { SourceString } from "../../types/source-string.type";
import { AssetPath } from "../../types/asset-path.type";
import { DatatableRef } from "../../types/datatable-ref.type";

export interface RawBestiary {
    "enemyName": SourceString,
    "enemyDesc": SourceString,
    "icon": AssetPath,
    "image": AssetPath,
    "enemyDataRow": DatatableRef
}
