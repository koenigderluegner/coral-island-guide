import { MinimalItem } from '../minimal-item.type';

export type SpecialItemRequirement = {
    type: 'SpecialItem',
    meta: {
        item: MinimalItem
    }
}
