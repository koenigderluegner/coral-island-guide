export interface RawNpcAppearances {
    "enabled": true,
    "Appearances": {
        "DataTable": {
            "ObjectName": string
            "ObjectPath": string
        },
        "RowName": string
    },
    "images": [
        {
            "EmotionRow": {
                "DataTable": {
                    "ObjectName": string
                    "ObjectPath": string
                },
                "RowName": string
            },
            "texture": {
                "AssetPathName": string
                "SubPathString":string
            }
        }
    ],
    "SkeletalMeshes": {
        "AssetPathName": string
        "SubPathString": string
    },
    "StaticMesh": {
        "AssetPathName": string
        "SubPathString":string
    },
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
