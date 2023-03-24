import { Item } from "@ci/data-types";

export interface BaseCatchableInterface {
    key: string;
    item: Item;
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
    rarity: string;
    minCaughtSize: number;
    maxCaughtSize: number;
}
