import { SourceString } from "../../types/source-string.type";

export interface RawLocationInfo {
    "location": string
    "locationText": SourceString,
    "tags": string[],
    "isIndoor": boolean,
    "worldLocation": string
}
