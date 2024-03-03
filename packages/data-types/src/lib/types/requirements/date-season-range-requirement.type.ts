import { SpecificDate } from "@ci/data-types";

export type DateSeasonRangeRequirement = {
    type: 'DateSeasonRange',
    meta: {
        from: SpecificDate,
        to: SpecificDate
        inverted?: boolean
    }
}
