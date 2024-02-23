import { SourceString } from "../../types/source-string.type";

export interface RawNPC {
    "characterID": string,
    "CharacterName": SourceString,
    "Description": SourceString,
    "portraitsDT": {
        "ObjectName": string,
        "ObjectPath": string,
    } | null,
    "Portrait": {
        "AssetPathName": string,
        "SubPathString": string,
    },
    "PortraitConcealed": {
        "AssetPathName": string,
        "SubPathString": string,
    },
    "mapIcon": {
        "AssetPathName": string,
        "SubPathString": string,
    },
    "isDateable": boolean,
    "canHaveRelationships": boolean,
    "canReceiveGifts": boolean,
    "canInteract": boolean,
    "dialogPortraitPosition": {
        "X": number
        "Y": number
    },
    "dialogPortraitScale": number
    "PortraitMenu": {
        "AssetPathName": string
        "SubPathString": string
    },
    "PortraitScale": number
    "PortraitScroll": {
        "X": number
        "Y": number
    },
    "UVTile": {
        "X": number
        "Y": number
    },
    "CalendarPortraitScale": number
    "CalendarPortraitScroll": {
        "X": number
        "Y": number
    },
    "CalendarUVTile": {
        "X": number
        "Y": number
    },
    "CharacterCategory": string
}
