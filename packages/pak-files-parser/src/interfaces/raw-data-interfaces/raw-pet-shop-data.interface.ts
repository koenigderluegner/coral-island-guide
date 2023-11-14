import { SourceString } from "../../types/source-string.type";

export interface RawPetShopData {
    "npcData": {
            "DataTable": {
                "ObjectName": string;
                "ObjectPath": string;
            },
            "RowName": string;
        },
        "portraitFullVerticalAlignment": string;
        "portraitFullRenderTranslation": {
            "X": number
            "Y": number
        },
        "portraitFullRenderScale": number
    "price": number,
    "description": SourceString
}
