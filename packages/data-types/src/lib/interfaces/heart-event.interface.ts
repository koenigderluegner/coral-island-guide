import { HeartEventTriggerData } from "@ci/data-types";

export interface HeartEvent {
    npc: string,
    heartLevel: number;
    trigger: Omit<HeartEventTriggerData, 'npc' | 'heartLevel'>[]
}
