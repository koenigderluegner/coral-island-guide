import { NPC } from '../interfaces/npc.interface';

/**
 * Minimal npc data for simple display.
 */
export type  MinimalNPC = Pick<NPC, 'key' | 'iconName' | 'characterName'>
