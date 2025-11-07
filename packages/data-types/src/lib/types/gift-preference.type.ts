import { MinimalItem } from './minimal-item.type';

export type GiftPreference =
    { type: 'item'; item: MinimalItem }
    | { type: 'category'; categoryName: string }
    | { type: 'tags'; tags: string[] }