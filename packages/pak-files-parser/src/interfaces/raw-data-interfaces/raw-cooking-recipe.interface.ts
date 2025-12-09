import { SourceString } from '../../types/source-string.type';
import { DatatableRef } from '../../types/datatable-ref.type';
import { ObjectPath } from '../../types/object-path.type';
import { ItemDatatableRef } from '../../types/item-datatable-ref';

export type CookingIngredients = (
    | {
          useCustomName: false;
          customName: SourceString;
      }
    | {
          useCustomName: true;
          customName: SourceString;
      }
) & {
    listIngredients: {
        itemData: ItemDatatableRef;
        useCategoryData: boolean;
        categoryData: {
            data: DatatableRef;
        };
        canUseSameItem: boolean;
        quantity: number;
        excludeItemData: [];
    }[];
};

export interface RawCookingRecipe {
    name: SourceString;
    description: SourceString;
    ingredients: CookingIngredients[];
    genericIngredients: {
        genericItem: DatatableRef;
        amount: number;
    }[];
    excludeIngredients: ItemDatatableRef[];
    smallIcon: ObjectPath;
    bigIcon: ObjectPath;
    utensils: string[];
    result: ItemDatatableRef;
}
