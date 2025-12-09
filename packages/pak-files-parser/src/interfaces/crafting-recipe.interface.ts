import { DatatableRef } from '../types/datatable-ref.type';
import { ItemDatatableRef } from '../types/item-datatable-ref';

export interface RawCraftingRecipe {
    readableName: string;
    item: ItemDatatableRef;
    amount: 1;
    ingredients: [
        {
            item: ItemDatatableRef;
            amount: number;
        },
    ];
    genericIngredients: {
        genericItem: DatatableRef;
        shouldBeSameItem: false;
        amount: 3;
    }[];
    dataCategory: DatatableRef;
}
