import { NPC } from '@ci/data-types';

/**
 * Minimal npc data for simple display.
 */
export type  MinimalNPC = Pick<NPC, 'key' | 'iconName' | 'characterName'>
