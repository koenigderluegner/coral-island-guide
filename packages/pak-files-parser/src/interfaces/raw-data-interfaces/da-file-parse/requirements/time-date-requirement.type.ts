import { Season } from "@ci/data-types";
import { RawRequirementWithMeta } from "./raw-requirement-with-meta";

export type RawTimeDateRequirement = RawRequirementWithMeta<'TimeDate', {
    "conditionType": "EC_TimeDateRequirementType::dateRangeInclusive",
    "dateRange": {
        "isValidOnSpecificDate": boolean,
        "isValidIndefinitelyOnceStarted": boolean,
        "startsFrom": {
            "day"?: number,
            "season": `EC_Season::${Season}`
            "year"?: number,
        },
        "lastsTill": {
            "day": number,
            "season": `EC_Season::${Season}`
            "year"?: number,
        }
    },
    "clampDateRange"?: {
        "isValidOnSpecificDate": boolean,
        "isValidIndefinitelyOnceStarted": boolean
    },
    "invertResult"?: boolean
}
>
