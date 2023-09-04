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
    "shopItemName": {
        "CultureInvariantString": null
    },
    "useCustomIcon": boolean,
    "customIcon": {
        "AssetPathName": string;
        "SubPathString": string;
    },
    "useCustomCategory": boolean,
    "customCategory": {
        "CultureInvariantString": null
    },
    "useCustomDescription": boolean,
    "customDescription": {
        "CultureInvariantString": null
    },
    "useCategory": boolean;
    "category": string;
    "priority": number;
    "priceOverride": number;
    "tag": string[]

    "isCurrentlyOutOfStock": boolean,
}
