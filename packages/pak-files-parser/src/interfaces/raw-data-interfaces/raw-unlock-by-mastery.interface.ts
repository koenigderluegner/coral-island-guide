type UnlockRecipe = {
    [masteryNameEnum: string]: {
        "craftingList": [
            {
                "useCustomID": boolean,
                "item": {
                    "data": {
                        "DataTable": {
                            "ObjectName": string,
                            "ObjectPath": string
                        },
                        "RowName": string
                    },
                    "itemID": string
                },
                "customID": string
            }
        ]
    }
};

export interface RawUnlockByMastery {
    "masteryLevel": number,
    "desc": string,
    "unlockRecipe": UnlockRecipe | UnlockRecipe[]

}
