import { MinimalItem } from '../minimal-item.type';

export type UnlockSpecialItemEffect = {
    type: 'UnlockSpecialItem',
    meta: {
        item: MinimalItem
    }
}
