import { Item } from '@ci/data-types';

/**
 * Minimal item data for simple display.
 */
export type  MinimalItem = Pick<Item, 'displayName' | 'iconName' | 'id'>