import { TagBasedItem } from '../interfaces/tag-based-item.interface';

/**
 * Minimal tag based item data for simple display.
 */
export type  MinimalTagBasedItem = Pick<TagBasedItem, 'displayName' | 'iconName' | 'key'>
