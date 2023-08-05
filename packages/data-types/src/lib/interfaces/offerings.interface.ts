import { OfferingReward } from "./offering-reward.interface";
import { Offering } from "./offering.interface";

export interface Offerings {
    title: string;
    imageName: string;
    numOfItemRequired: number;
    requiredItems: Offering[];
    rewards: OfferingReward;
}
