import { MinimalItem } from '@ci/data-types';

export type GiftPreference =
    { type: 'item'; item: MinimalItem }
    | { type: 'category'; categoryName: string }
    | { type: 'tags'; tags: string[] }