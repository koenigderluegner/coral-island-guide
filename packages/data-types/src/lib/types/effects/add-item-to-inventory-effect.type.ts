import { MinimalItem } from "@ci/data-types";

export type AddItemToInventoryEffect = {
    "type": 'AddItemToInventory',
    meta: {
        "quantity"?: number;
        "isQuestReward"?: boolean
        item: MinimalItem
    }
}
