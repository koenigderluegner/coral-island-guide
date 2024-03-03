import { EnumString, Season } from "@ci/data-types";

export interface RawFish {
    isEnabled: boolean,
    FishSKU: {
        data: {
            DataTable: {
                ObjectName: string;
                ObjectPath: string;
            },
            RowName: string
        },
        itemID: string
    },
    FishName: string;
    fishMesh: {
        AssetPathName: string
        SubPathString: string
    },
    fishSize: string;
    SpawnArea: {
        CanBeCatchOnLake: boolean,
        CanBeCatchOnRiver: boolean,
        CanBeCatchOnOcean: boolean,
        CanBeCatchOnCave: boolean,
        CanBeCatchOnPond: boolean
    },
    SpawnLocation: string[],
    SpawnTime: {
        Morning: boolean,
        Afternoon: boolean,
        Evening: boolean,
        Night: boolean
    },
    SpawnWeather: {
        Sunny: boolean,
        Rain: boolean,
        Storm: boolean,
        Windy: boolean,
        Snow: boolean,
        Blizzard: boolean
    },
    SpawnSeason: {
        Spring: boolean,
        Summer: boolean,
        Fall: boolean,
        Winter: boolean
    },
    Rarity: string;
    minCaughtSize: number
    maxCaughtSize: number
    isUsingSpecificDate: boolean,
    dateRangeList: {
        isValidOnSpecificDate: boolean,
        isValidIndefinitelyOnceStarted: boolean,
        random: boolean,
        startsFrom: {
            day: number,
            season: EnumString<Season>,
            year: number
        },
        lastsTill: {
            day: number,
            season: EnumString<Season>,
            year: number
        }
    }[],
    experienceGrantedWhenCaught: number
}
