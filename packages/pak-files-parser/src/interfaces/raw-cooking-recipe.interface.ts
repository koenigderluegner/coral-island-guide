export interface RawCookingRecipe {
    "name": {
        "Namespace": string;
        "Key": string;
        "SourceString": string;
    },
    "description": {
        "Namespace": string;
        "Key": string;
        "SourceString": string;
    },
    "ingredients":
        ({
            "useCustomName": false,
            "customName": {
                "CultureInvariantString": null
            },
        } | {
            "useCustomName": true,
            "customName": {
                "Namespace": string;
                "Key": string;
                "SourceString": string;
            }
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
    }[],
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
