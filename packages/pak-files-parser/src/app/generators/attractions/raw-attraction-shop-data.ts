import { AssetPath } from "../../../types/asset-path.type";
import { SourceString } from "../../../types/source-string.type";
import { ItemDatatableRef } from "../../../types/item-datatable-ref";
import { DatatableRef } from "../../../types/datatable-ref.type";

export type RawAttractionShopData = {
    "requirements": {
        "item": ItemDatatableRef,
        "amount": number
    }[],
    "attractionRequirements": {
        "attractionName": DatatableRef
    }[],
    "townAttraction": {
        "attractionName": DatatableRef
    },
    "daysToComplete": number,
    "attractionLocation": {
        "X": number
        "Y": number
        "Z": number
    },
    "isProjectIndoor": boolean,
    "mapToLoad": [],
    "projectImage": AssetPath,
    "projectIcon": AssetPath,
    "haveConnectedProject": boolean,
    "contractorData": DatatableRef,
    "perkData": {
        "perkDescription": SourceString,
        "perkIcon": AssetPath
    }[],
    "areaTag": {
        "TagName": string
    },
    "relatedCutsceneTopic": string,
    "enable": true,
    "townRank": number,
    "item": ItemDatatableRef,
    "useCustomName": boolean,
    "shopItemName": SourceString,
    "useCustomIcon": boolean,
    "customIcon": AssetPath,
    "useCustomCategory": boolean,
    "customCategory": SourceString,
    "useCustomDescription": boolean,
    "customDescription": SourceString,
    "useCategory": boolean,
    "category": "EC_ItemCategory::None",
    "priority": number,
    "priceOverride": number,
    "tag": []
}
