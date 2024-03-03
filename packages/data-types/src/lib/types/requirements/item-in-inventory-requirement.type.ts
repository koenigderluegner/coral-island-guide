import { MinimalItem } from "@ci/data-types";

export type ItemInInventoryRequirement = {
    type: 'ItemInInventory',
    meta: {
        item: MinimalItem,
        amount: number,
        requiredQuality?: string;
    }
}
