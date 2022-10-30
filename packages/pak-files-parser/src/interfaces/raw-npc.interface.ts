export interface RawNPC {
    "characterID": string,
    "CharacterName": {
        "Namespace": string,
        "Key": string,
        "SourceString": string,
    },
    "Description": {
        "Namespace": string,
        "Key": string,
        "SourceString": string,
    },
    "portraitsDT": {
        "ObjectName": string,
        "ObjectPath": string,
    },
    "Portrait": {
        "AssetPathName": string,
        "SubPathString": string,
    },
    "PortraitConcealed": {
        "AssetPathName": string,
        "SubPathString": string,
    },
    "mapIcon": {
        "ObjectName": string,
        "ObjectPath": string,
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