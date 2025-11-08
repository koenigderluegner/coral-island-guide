import { OfferingReward } from "./offering-reward.interface";
import { Offering } from "./offering.interface";
import { OfferingType } from "../types/offering-type.type";
import { TranslationKey } from "../types/translation-key";

export interface Offerings {
    title: TranslationKey;
    imageName: string;
    numOfItemRequired: number;
    requiredItems: Offering[];
    rewards: OfferingReward;
    offeringType: OfferingType
}
