import { OfferingReward } from "@ci/data-types";

export interface OfferingMatch {
    key: string;
    offeringId: string
    rewardID: string
    rewardItem: string
    rewards: OfferingReward
}
