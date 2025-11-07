import { Item } from '../interfaces/item.interface';

/**
 * Minimal item data for simple display.
 */
export type  MinimalItem = Pick<Item, 'displayName' | 'iconName' | 'id'>