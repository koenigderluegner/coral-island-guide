import { HeartEventTriggerData } from './heart-event-trigger-data.interface';

export interface HeartEvent {
    npc: string,
    heartLevel: number;
    trigger: Omit<HeartEventTriggerData, 'npc' | 'heartLevel'>[]
}
