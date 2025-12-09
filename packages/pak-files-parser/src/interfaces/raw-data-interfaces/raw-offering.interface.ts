import { SourceString } from "../../types/source-string.type";
import { AssetPath } from "../../types/asset-path.type";
import { OfferingType } from "@ci/data-types";
import { ItemDatatableRef } from "../../types/item-datatable-ref";

export interface RawOffering {
    "offeringTitleText": SourceString,
    "offeringImage": AssetPath,
    "requiredItems": [
        {
            "useGenericItem": boolean,
            "itemData": ItemDatatableRef,
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
