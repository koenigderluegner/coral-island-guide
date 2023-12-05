import { BaseCatchableInterface } from "./base-catchable.interface";
import { SpecificDate } from "./specific-date.interface";

export  type FishSpawnSettings = {
    key: string
    spawnSeason: {
        spring: boolean,
        summer: boolean,
        fall: boolean,
        winter: boolean
    },
    spawnWeather: {
        sunny: boolean,
        rain: boolean,
        storm: boolean,
        windy: boolean,
        snow: boolean,
        blizzard: boolean
    }
    spawnLocation: string[],
    spawnTime: {
        morning: boolean,
        afternoon: boolean,
        evening: boolean,
        night: boolean
    },
    spawnArea: {
        canBeCatchOnLake: boolean,
        canBeCatchOnRiver: boolean,
        canBeCatchOnOcean: boolean,
        canBeCatchOnCave: boolean,
        canBeCatchOnPond: boolean
    },
    isUsingSpecificDate: boolean,
    dateRangeList: {
        isValidOnSpecificDate: boolean,
        isValidIndefinitelyOnceStarted: boolean,
        random: boolean,
        startsFrom: SpecificDate,
        lastsTill: SpecificDate
    }[],
}

export interface Fish extends Omit<BaseCatchableInterface, 'spawnLocation' | 'spawnTime' | 'spawnSeason' | 'spawnWeather'> {
    isEnabled: boolean;
    fishName: string;
    fishSize: string;
    spawnSettings: FishSpawnSettings[]

    experienceGrantedWhenCaught: number
}
