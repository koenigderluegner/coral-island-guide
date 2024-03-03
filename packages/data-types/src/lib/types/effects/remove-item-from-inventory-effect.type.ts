import { MinimalItem } from "@ci/data-types";

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
