import { CookingIngredients } from "../../../interfaces/raw-data-interfaces/raw-cooking-recipe.interface";
import { SourceString } from "../../../types/source-string.type";
import { DatatableRef } from "../../../types/datatable-ref.type";
import { ObjectPath } from "../../../types/object-path.type";
// TODO  Very similar to cooking recipe , maybe re-use?

export type RawItemMixingRecipeData = {
    "name": SourceString,
    "description": SourceString,
    "ingredients": CookingIngredients[    ],
    "genericIngredients": {
        "genericItem": DatatableRef,
        "amount": number
    }    [],
    "excludeIngredients":
        {
            "data": DatatableRef,
            "itemID": string;
        } [],
    "smallIcon": ObjectPath,
    "bigIcon": ObjectPath,
    "result": {
        "data": DatatableRef,
        "itemID": string;
    }
    "resultQtyMultiplier": 2
}
