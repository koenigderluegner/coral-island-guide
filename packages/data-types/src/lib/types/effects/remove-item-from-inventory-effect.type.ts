import { MinimalItem } from '../minimal-item.type';

export type RemoveItemFromInventoryEffect = {
    type: 'RemoveItemFromInventory',
    meta: {
        category: string;
        amount: number
    } | {
        item: MinimalItem
        amount: number;
    }
}
