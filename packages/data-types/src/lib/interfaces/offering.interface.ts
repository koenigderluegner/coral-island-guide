import { MinimalItem } from '../types/minimal-item.type';
import { MinimalTagBasedItem } from '../types/minimal-tag-based-item.type';
import { Quality } from '../enums/quality.enum';

export interface Offering {
    item: MinimalItem | MinimalTagBasedItem,
    amount: number,
    quality?: Quality
}
