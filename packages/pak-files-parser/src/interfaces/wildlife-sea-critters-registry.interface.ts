import { BaseCatchableInterface } from "../../../data-types/src/lib/interfaces/base-catchable.interface";

export type WildlifeSeaCrittersRegistry = {
    type: string;
    spawnAmountModifiers?: [string, number][]
} & Pick<BaseCatchableInterface, 'spawnSeason' | 'spawnLocation' | 'spawnWeather' | 'spawnTime'>
