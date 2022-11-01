import { Item } from '@ci/data-types';

export interface Critter {
    key: string;
    "rarity": string;
    "minCaughtSize": number;
    "maxCaughtSize": number;
    bugsBehaviourPreset: string;
    item: Item;

    [key: string]: Item | string | number;
}