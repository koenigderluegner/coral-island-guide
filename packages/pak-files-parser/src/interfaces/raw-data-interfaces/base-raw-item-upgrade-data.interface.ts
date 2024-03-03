import { SourceString } from "../../types/source-string.type";

export interface BaseRawItemUpgradeData {
    "price": number;
    "daysDelay": number;
    "unlockRequirements": {
        "item": {
            "data": {
                "DataTable": {
                    "ObjectName": string;
                    "ObjectPath": string;
                },
                "RowName": string;
            },
            "itemID": string;
        },
        "amount": number;
    }    [ ],
    "requirements": {
        "item": {
            "data": {
                "DataTable": {
                    "ObjectName": string;
                    "ObjectPath": string;
                },
                "RowName": string;
            },
            "itemID": string;
        },
        "amount": number;
    }[],
    "hardnessLevel": string;
    "toolType": string;
    "imagePreview": null,
    "enable": boolean,
    "townRank": number;
    "item": {
        "data": {
            "DataTable": {
                "ObjectName": string;
                "ObjectPath": string;
            },
            "RowName": string;
        },
        "itemID": string;
    },
    "useCustomName": boolean,
    "shopItemName": SourceString,
    "useCustomIcon": boolean,
    "customIcon": {
        "AssetPathName": string;
        "SubPathString": string;
    },
    "useCustomCategory": boolean,
    "customCategory": SourceString,
    "useCustomDescription": boolean,
    "customDescription": SourceString,
    "useCategory": boolean;
    "category": string;
    "priority": number;
    "priceOverride": number;
    "tag": string[]

    "isCurrentlyOutOfStock": boolean,
}
