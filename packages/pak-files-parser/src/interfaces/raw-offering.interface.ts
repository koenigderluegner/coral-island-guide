export interface RawOffering {
    "offeringTitleText": {
        "Namespace": string
        "Key": string
        "SourceString": string
    },
    "offeringImage": {
        "ObjectName": string
        "ObjectPath": string
    },
    "requiredItems": [
        {
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
            "itemQuantity": number
        },
    ],
    "numOfItemRequired": number
}
