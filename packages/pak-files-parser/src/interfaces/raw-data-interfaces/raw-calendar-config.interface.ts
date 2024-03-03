import { SourceString } from "../../types/source-string.type";
import { Season } from "../../../../data-types/src/lib/types/season.type";

export interface RawCalendarConfig {
    "Type": "C_TownCalendarConfig",
    "Name": "TownCalendarConfig",
    "Class": "UScriptClass'C_TownCalendarConfig'",
    "Properties": {
        [key: string]: {
            "map": {
                "Key": {
                    "day": number,
                    "season": Season,
                    "year": number
                },
                "Value": {
                    "entries": {
                        "eventType": string,
                        "repeatType": string
                        "eventName": SourceString,
                        "eventId": string,
                        "relatedNPCs": string[],
                        "eventTimeRange": {
                            "fromTime": {
                                "hours": number,
                                "minutes": number
                            },
                            "toTime": {
                                "hours": number,
                                "minutes": number
                            }
                        }
                    }[]
                }
            }[]
        }
    }
}
