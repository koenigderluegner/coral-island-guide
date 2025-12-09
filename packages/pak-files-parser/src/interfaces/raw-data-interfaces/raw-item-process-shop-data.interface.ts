import { ItemDatatableRef } from '../../types/item-datatable-ref';

export interface RawItemProcessShopData {
    input: {
        item: ItemDatatableRef;
        amount: number;
    };
    gold: number;
    outputChance: {
        item: {
            item: ItemDatatableRef;
            amount: number;
        };
        chance: number;
    }[];
}
