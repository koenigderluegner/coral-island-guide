export interface RawWildlifeSeaCrittersRegistry {
    "type": {
        "ObjectName": string;
        "ObjectPath": string;
    } | {
        "AssetPathName": string,
        "SubPathString": string
    },
    "spawnOptions": {
        "spawnLimit": {
            "Type": string;
            "Value": number;
        },
        "dailySpawn": {
            "LowerBound": {
                "Type": string;
                "Value": number;
            },
            "UpperBound": {
                "Type": string;
                "Value": number;
            }
        },
        "spawnAmountGenerator": {
            "ObjectName": string;
            "ObjectPath": string;
        },
        "spawnAmountConditionModifier": Record<string, number>,
        "lifetime": string;
        "spawnPeriod": string;
        "firstDayMaximize": boolean;
        "fillLimitOnFirstDay": boolean;
        "zoneRarityDistribution": Record<string, number>[]
    },
    "conditions": {
        "always": false,
        "zones": {
            "DataTable": {
                "ObjectName": string;
                "ObjectPath": string;
            },
            "RowName": string;
        }[],
        "seasons": string[],
        "dayTimeAllowed": boolean,
        "nightTimeAllowed": boolean,
        "time": [],
        "weekDays": [],
        "weather": string[],
        "townRank": {
            "LowerBound": {
                "Type": string;
                "Value": number;
            },
            "UpperBound": {
                "Type": string;
                "Value": number;
            }
        },
        "oceanQuality": {
            "LowerBound": {
                "Type": string;
                "Value": number;
            },
            "UpperBound": {
                "Type": string;
                "Value": number;
            }
        },
        "requirements": null
    },
    "IsEditorOnly": boolean
}
