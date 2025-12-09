import { SourceString } from "../../types/source-string.type";
import { DatatableRef } from "../../types/datatable-ref.type";

export interface RawPetShopData {
    "npcData": DatatableRef,
    "portraitFullVerticalAlignment": string;
    "portraitFullRenderTranslation": {
        "X": number
        "Y": number
    },
    "portraitFullRenderScale": number
    "price": number,
    "description": SourceString
}
