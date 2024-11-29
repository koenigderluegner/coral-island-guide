import { SourceString } from "../../types/source-string.type";
import { AssetPath } from "../../types/asset-path.type";
import { OfferingType } from "@ci/data-types";

export interface RawOffering {
    "offeringTitleText": SourceString,
    "offeringImage": AssetPath,
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
    "numOfItemRequired": number;
    "offeringType": `EC_OfferingType::${OfferingType}`,
}
