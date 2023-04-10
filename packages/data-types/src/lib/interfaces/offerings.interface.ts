import { OfferingReward } from "./offering-reward.interface";
import { MinimalItem } from "../types/minimal-item.type";
import { Quality } from "../enums/quality.enum";

export interface Offerings {
    title: string;
    imageName: string;
    numOfItemRequired: number;
    requiredItems: {
        item: MinimalItem,
        amount: number,
        quality?: Quality
    }[];
    rewards: OfferingReward;
}
