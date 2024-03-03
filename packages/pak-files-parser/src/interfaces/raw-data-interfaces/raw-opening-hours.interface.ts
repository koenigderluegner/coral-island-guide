import { Time } from "@ci/data-types";

type OptionalMinutesTime = Omit<Time, 'minutes'> & { minutes: number | undefined }

export interface RawOpeningHours {
    "Type": string;
    "Name": string;
    "Class": string;
    "Properties": {
        "coreOpeningHoursConfig": {
            "coreOpeningDays": string[],
            "coreOpeningHours": {
                "fromTime": OptionalMinutesTime,
                "toTime": OptionalMinutesTime
            },
            "dayOfTheWeekSpecificOpeningHours"?: Record<string, {
                "fromTime": OptionalMinutesTime,
                "toTime": OptionalMinutesTime
            }>[]

        }
    }
}
