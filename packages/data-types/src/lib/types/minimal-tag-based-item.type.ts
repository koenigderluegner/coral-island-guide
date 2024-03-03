import { TagBasedItem } from '@ci/data-types';

/**
 * Minimal tag based item data for simple display.
 */
export type  MinimalTagBasedItem = Pick<TagBasedItem, 'displayName' | 'iconName' | 'key'>
