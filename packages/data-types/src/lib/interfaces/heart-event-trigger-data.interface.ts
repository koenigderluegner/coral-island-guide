import { Time } from "./time.interface";

export interface HeartEventTriggerData {
    id: string;
    enabled: boolean,
    npc: string
    heartLevel: number
    cutscene: string
    location: string,
    time: {
        fromTime: Time,
        toTime: Time
    },
    specificDay: string[ ],
    specificMonth: string[],
    specificWeather: string[],
    otherCutscenesState: Record<string, boolean>[],
    canTriggerSameDay: boolean
}
