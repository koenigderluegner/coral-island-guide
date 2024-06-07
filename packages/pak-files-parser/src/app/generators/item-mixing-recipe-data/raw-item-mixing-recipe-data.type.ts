import { CookingIngredients } from "../../../interfaces/raw-data-interfaces/raw-cooking-recipe.interface";
import { SourceString } from "../../../types/source-string.type";
// TODO  Very similar to cooking recipe , maybe re-use?

export type RawItemMixingRecipeData = {
    "name": SourceString,
    "description": SourceString,
    "ingredients": CookingIngredients[    ],
    "genericIngredients": {
        "genericItem": {
            "DataTable": {
                "ObjectName": string;
                "ObjectPath": string;
            },
            "RowName": string;
        },
        "amount": number
    }    [],
    "excludeIngredients":
        {
            "data": {
                "DataTable": {
                    "ObjectName": string;
                    "ObjectPath": string;
                },
                "RowName": string;
            },
            "itemID": string;
        } [],
    "smallIcon": {
        "ObjectName": string;
        "ObjectPath": string;
    },
    "bigIcon": {
        "ObjectName": string;
        "ObjectPath": string;
    },
    "result": {
        "data": {
            "DataTable": {
                "ObjectName": string;
                "ObjectPath": string;
            },
            "RowName": string;
        },
        "itemID": string;
    }
    "resultQtyMultiplier": 2
}
