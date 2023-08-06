import { BaseCatchableInterface } from "./base-catchable.interface";
import { SpecificDate } from "./specific-date.interface";

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
        startsFrom: SpecificDate,
        lastsTill: SpecificDate
    }[],
    experienceGrantedWhenCaught: number
}
