import { SourceString } from "../../types/source-string.type";

export interface RawTagBasedItemGeneric {
    "tagQuery": {
        "TokenStreamVersion": 0,
        "TagDictionary": {
            "TagName": string
        }        [ ],
        "QueryTokenStream": number[

            ],
        "UserDescription": string
        "AutoDescription": string
    },
    "icon": {
        "AssetPathName": "/Game/ProjectCoral/Textures/AtlasImport/Frames/Spring_Offerings_png.Spring_Offerings_png",
        "SubPathString": string
    },
    "readableText": SourceString
}
