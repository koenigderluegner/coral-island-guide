export interface RawItemProcessShopData {
    "input": {
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
    },
    "gold": number,
    "outputChance": {
        "item": {
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
        },
        "chance": number
    }    [ ]
}
