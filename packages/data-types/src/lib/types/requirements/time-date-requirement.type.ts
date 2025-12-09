import { SpecificDate } from "../../interfaces/specific-date.interface";
import { RequirementWithMeta } from "./requirement-with-meta";

export type TimeDateRequirement = RequirementWithMeta<'TimeDate', {
    inverted?: boolean;
    conditionType: "dateRangeInclusive",
    dateRange: {
        isValidOnSpecificDate: boolean,
        isValidIndefinitelyOnceStarted: boolean,
        startsFrom: SpecificDate,
        lastsTill: SpecificDate
    },
    clampDateRange?: {
        isValidOnSpecificDate: boolean,
        isValidIndefinitelyOnceStarted: boolean
    },
}
>
