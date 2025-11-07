import { MinimalItem } from '../minimal-item.type';

export type AddItemToInventoryEffect = {
    "type": 'AddItemToInventory',
    meta: {
        "quantity"?: number;
        "isQuestReward"?: boolean
        item: MinimalItem
    }
}
