import { SourceString } from "../../types/source-string.type";

export type CookingIngredients = ({
    "useCustomName": false,
    "customName": SourceString,
} | {
    "useCustomName": true,
    "customName": SourceString
}) & {
    "listIngredients":
        {
            "itemData": {
                "data": {
                    "DataTable": {
                        "ObjectName": string;
                        "ObjectPath": string;
                    },
                    "RowName": string;
                },
                "itemID": string;
            },
            "useCategoryData": boolean
            "categoryData": {
                "data": {
                    "DataTable": {
                        "ObjectName": string;
                        "ObjectPath": string;
                    },
                    "RowName": string;
                }
            },
            "canUseSameItem": boolean
            "quantity": number,
            "excludeItemData": []
        }[]
}

export interface RawCookingRecipe {
    "name": SourceString,
    "description": SourceString,
    "ingredients": CookingIngredients[],
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
    "utensils": string[

        ],
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
}
