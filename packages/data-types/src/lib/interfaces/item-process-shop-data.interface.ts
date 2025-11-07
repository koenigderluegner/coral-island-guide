import { MinimalItem } from '../types/minimal-item.type';
import { ChancePerItem } from "./chance-per-item.interface";

export interface ItemProcessShopData {
    input: MinimalItem;
    inputAmount: number;
    processingCost: number;
    outputChanges: ChancePerItem []
}
