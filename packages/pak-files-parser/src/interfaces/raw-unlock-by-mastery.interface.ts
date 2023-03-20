export interface RawUnlockByMastery {
    "masteryLevel": number,
    "desc": string,
    "unlockRecipe": {
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
    }

}
