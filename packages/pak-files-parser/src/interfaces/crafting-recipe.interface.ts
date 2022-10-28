export interface RawCraftingRecipe {
    "readableName": string,
    "item": {
        "data": {
            "DataTable": {
                "ObjectName": string
                "ObjectPath": string
            },
            "RowName": string
        },
        "itemID": string
    },
    "amount": 1,
    "ingredients": [
        {
            "item": {
                "data": {
                    "DataTable": {
                        "ObjectName": string
                        "ObjectPath": string
                    },
                    "RowName": string
                },
                "itemID": string
            },
            "amount": number
        }
    ],
    "genericIngredients": {
        "genericItem": {
            "DataTable": {
                "ObjectName": string;
                "ObjectPath": string;
            },
            "RowName": string;
        },
        "shouldBeSameItem": false,
        "amount": 3
    }[],
    "dataCategory": {
        "DataTable": {
            "ObjectName": string
            "ObjectPath": string
        },
        "RowName": string
    }
}
