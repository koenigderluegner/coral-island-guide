import { SourceString } from "../../types/source-string.type";

export interface RawOffering {
    "offeringTitleText": SourceString,
    "offeringImage": {
        "ObjectName": string
        "ObjectPath": string
    },
    "requiredItems": [
        {
            "useGenericItem": boolean,
            "itemData": {
                "data": {
                    "DataTable": {
                        "ObjectName": string
                        "ObjectPath": string
                    },
                    "RowName": string
                },
                "itemID": string
            },
            "genericItem": {
                "genericItem": {
                    "DataTable": string | null
                    "RowName": string;
                },
                "amount": number
            }
            "itemQuantity": number
        },
    ],
    "numOfItemRequired": number
}
