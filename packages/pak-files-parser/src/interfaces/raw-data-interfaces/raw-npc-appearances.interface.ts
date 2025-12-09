import { DatatableRef } from "../../types/datatable-ref.type";
import { AssetPath } from "../../types/asset-path.type";

export interface RawNpcAppearances {
    "enabled": true,
    "Appearances": DatatableRef,
    "images": {
        "EmotionRow": DatatableRef,
        "texture": AssetPath
    }[],
    "SkeletalMeshes": AssetPath,
    "StaticMesh": AssetPath,
    "dialogPortraitPosition": {
        "X": number
        "Y": number
    },
    "dialogPortraitScale": number
    "relationshipPortraitPosition": {
        "X": number
        "Y": number
    },
    "relationshipPortraitScale": number
    "kawaiiPhysicsSetting": {
        "physicsSettingMap": []
    }
}
