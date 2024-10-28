import { SpecificDate } from "../../interfaces/specific-date.interface";

export type TimeDateRequirement = {
    type: 'TimeDate',
    meta: {
        inverted?: boolean;
        "conditionType": "dateRangeInclusive",
        "dateRange": {
            "isValidOnSpecificDate": boolean,
            "isValidIndefinitelyOnceStarted": boolean,
            "startsFrom": SpecificDate,
            "lastsTill": SpecificDate
        },
        "clampDateRange"?: {
            "isValidOnSpecificDate": boolean,
            "isValidIndefinitelyOnceStarted": boolean
        },
    }
}
