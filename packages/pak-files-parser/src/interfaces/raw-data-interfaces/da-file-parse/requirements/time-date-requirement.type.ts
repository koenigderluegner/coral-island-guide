import { Season } from "@ci/data-types";

export type RawTimeDateRequirement = {
    "Type": "C_TimeDateRequirement",
    "Name": string;
    "Outer": string;
    "Class": "UScriptClass'C_TimeDateRequirement'",
    "Properties": {
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
}
