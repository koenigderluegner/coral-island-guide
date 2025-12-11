import { SourceString } from "../../types/source-string.type";
import { EnumString } from "@ci/data-types";

export interface RawTownRankPoints {
    "enabled": boolean,
    "point": number,
    "category": EnumString<'Attraction'>, // proper enum
    "description": SourceString
}
