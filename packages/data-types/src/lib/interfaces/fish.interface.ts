import { Item } from '@ci/data-types';

export interface Fish {
    key: string;
    item: Item;
    isEnabled: boolean;
    fishName: string;
    fishSize: string;
    spawnArea: {
        canBeCatchOnLake: boolean,
        canBeCatchOnRiver: boolean,
        canBeCatchOnOcean: boolean,
        canBeCatchOnCave: boolean,
        canBeCatchOnPond: boolean
    },
    spawnLocation: string[],
    spawnTime: {
        morning: boolean,
        afternoon: boolean,
        evening: boolean,
        night: boolean
    },
    spawnWeather: {
        sunny: boolean,
        rain: boolean,
        storm: boolean,
        windy: boolean,
        snow: boolean,
        blizzard: boolean
    },
    spawnSeason: {
        spring: boolean,
        summer: boolean,
        fall: boolean,
        winter: boolean
    },
    rarity: string;
    minCaughtSize: number
    maxCaughtSize: number
    isUsingSpecificDate: boolean,
    dateRangeList: {
        isValidOnSpecificDate: boolean,
        isValidIndefinitelyOnceStarted: boolean,
        random: boolean,
        startsFrom: {
            day: number,
            season: string,
            year: number
        },
        lastsTill: {
            day: number,
            season: string,
            year: number
        }
    }[],
    experienceGrantedWhenCaught: number
}