import { MinimalItem } from "@ci/data-types";

export interface ItemProcessShopData {
    input: MinimalItem;
    inputAmount: number;
    processingCost: number;
    outputChanges: {
        item: MinimalItem;
        chance: number;
        amount: number;
    } []
}
