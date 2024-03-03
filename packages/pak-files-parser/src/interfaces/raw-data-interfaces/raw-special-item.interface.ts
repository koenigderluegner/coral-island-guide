import { SourceString } from "../../types/source-string.type";

export interface RawSpecialItem {
    "id": string
    "advancedVariant": string[],
    "name": SourceString,
    "description": SourceString,
    "icon": {
        "ObjectName": string
        "ObjectPath": string
    }
}
