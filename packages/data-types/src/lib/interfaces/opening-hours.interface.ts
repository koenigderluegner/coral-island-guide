import { Time } from "@ci/data-types";

export interface OpeningHours {
    isCoreOnlyWeekdays: boolean;
    isCoreEveryDay: boolean;

    "coreOpeningDays": string[],
    "coreOpeningHours": {
        "from": Time,
        "to": Time
    },
    "dayOfTheWeekSpecificOpeningHours"?: Record<string, {
        "from": Time,
        "to": Time
    }>


}
