import { MinimalItem } from "@ci/data-types";
import { ChancePerItem } from "./chance-per-item.interface";

export interface ItemProcessShopData {
    input: MinimalItem;
    inputAmount: number;
    processingCost: number;
    outputChanges: ChancePerItem []
}
