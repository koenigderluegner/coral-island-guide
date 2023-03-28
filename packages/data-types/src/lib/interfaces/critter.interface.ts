import { BaseCatchableInterface } from "./base-catchable.interface";

export interface Critter extends BaseCatchableInterface {
    bugsBehaviourPreset: string;
    spawnAmountModifiers?: [string, number][]
}
