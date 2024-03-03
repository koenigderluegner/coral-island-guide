export interface RawItemProcessing {
    "useCategory": boolean,
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
    "category": {
        "data": {
            "DataTable": {
                "ObjectName": string
                "ObjectPath": string
            },
            "RowName": string
        }
    },
    "useGenericRequirement": boolean,
    "genericInput": {
        "genericItem": {
            "DataTable": null | string,
            "RowName": "None"
        },
        "amount": number
    },
    "inputAmount": number,
    "additionalInput": {
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
    }[],
    "output": {
        "data": {
            "DataTable": {
                "ObjectName": string
                "ObjectPath": string
            },
            "RowName": string
        },
        "itemID": string
    },
    "amount": number,
    "day": number,
    "time": {
        "hours": number,
        "minutes": number
    }
}
