import { SourceString } from "../../types/source-string.type";

export interface RawPetShopData {
    "petData": {
        "npcData": {
            "DataTable": {
                "ObjectName": string;
                "ObjectPath": string;
            },
            "RowName": string;
        },
        "nickname": string;
        "portraitFullVerticalAlignment": string;
        "portraitFullRenderTranslation": {
            "X": number
            "Y": number
        },
        "portraitFullRenderScale": number
    },
    "price": number,
    "description": SourceString
}
