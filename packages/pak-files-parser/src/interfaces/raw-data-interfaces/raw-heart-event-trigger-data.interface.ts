import { AssetMap } from "../../types/asset-map.type";
import type { SourceString } from "../../types/source-string.type";

export interface RawHeartEventTriggerData {
    enabled: boolean,
    npc: string
    heartLevel: number
    cutscene: string
    locationRow: {
        DataTable: {
            ObjectName: string
            ObjectPath: string
        },
        RowName: string
    },
    time: {
        fromTime: {
            hours: number
            minutes: number
        },
        toTime: {
            hours: number
            minutes: number
        }
    },
    specificDay: string[ ],
    specificMonth: string[],
    specificWeather: string[],
    otherCutscenesState: AssetMap<boolean>[],
    heartEventDescriptionRequirements: SourceString[];
    canTriggerSameDay: boolean
}
