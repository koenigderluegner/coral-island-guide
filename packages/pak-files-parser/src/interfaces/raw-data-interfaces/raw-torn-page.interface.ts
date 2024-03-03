import { SourceString } from "../../types/source-string.type";
import { Color } from "../../types/color.type";

export interface RawTornPage {
    "titleText": SourceString,
    "image": {
        "AssetPathName": string
        "SubPathString": string
    },
    "type": string
    "contentText": SourceString,
    "tornPagesEffects": {
        "AssetPathName": string
        "SubPathString": string
    },
    "isPhotoAttached": boolean,
    "photoPaperColor": Color,
    "photoBGColor": Color,
    "photoImage": {
        "AssetPathName": string
        "SubPathString": string
    }
}
