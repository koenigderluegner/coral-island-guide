import { Time } from "@ci/data-types";
import { AssetMap } from "../../types/asset-map.type";

type OptionalMinutesTime = Omit<Time, 'minutes'> & { minutes: number | undefined }

export interface RawOpeningHours {
    "Type": string;
    "Name": string;
    "Class": string;
    "Properties": {
        "coreOpeningHoursConfig"?: {
            "coreOpeningDays": string[],
            "coreOpeningHours": {
                "fromTime": OptionalMinutesTime,
                "toTime": OptionalMinutesTime
            },
            "dayOfTheWeekSpecificOpeningHours"?: AssetMap<{
                "fromTime": OptionalMinutesTime,
                "toTime": OptionalMinutesTime
            }>[]

        }
        "specificSeasonOpeningHours"?: AssetMap<{
            "coreOpeningDays": string[],
            "coreOpeningHours": {
                "fromTime": OptionalMinutesTime,
                "toTime": OptionalMinutesTime
            },
            "dayOfTheWeekSpecificOpeningHours": AssetMap<{
                "fromTime": OptionalMinutesTime,
                "toTime": OptionalMinutesTime
            }>[]
            "specificDateOpeningHours": []
        }>[]
    }
}
