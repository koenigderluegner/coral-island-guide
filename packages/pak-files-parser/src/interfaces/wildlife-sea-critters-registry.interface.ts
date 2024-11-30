import { BaseCatchableInterface } from "@ci/data-types";

export type WildlifeSeaCrittersRegistry = {
    type: string;
    spawnAmountModifiers?: [string, number][]
} & Pick<BaseCatchableInterface, 'spawnSeason' | 'spawnLocation' | 'spawnWeather' | 'spawnTime'>
