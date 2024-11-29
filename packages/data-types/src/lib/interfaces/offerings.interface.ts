import { OfferingReward } from "./offering-reward.interface";
import { Offering } from "./offering.interface";
import { OfferingType } from "../types/offering-type.type";

export interface Offerings {
    title: string;
    imageName: string;
    numOfItemRequired: number;
    requiredItems: Offering[];
    rewards: OfferingReward;
    offeringType: OfferingType
}
