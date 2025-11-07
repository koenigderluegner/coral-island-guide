import { MinimalItem } from '../minimal-item.type';

export type ItemInInventoryRequirement = {
    type: 'ItemInInventory',
    meta: {
        item: MinimalItem,
        amount: number,
        requiredQuality?: string;
    }
}
