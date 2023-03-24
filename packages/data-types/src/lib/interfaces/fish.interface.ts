import { BaseCatchableInterface } from "./base-catchable.interface";

export interface Fish extends BaseCatchableInterface {
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
