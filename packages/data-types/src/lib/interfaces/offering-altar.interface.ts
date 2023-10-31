import { Offerings } from "./offerings.interface";

export interface OfferingAltar {
    key: string;
    urlPath: string;
    offeringGroupTitle: string;
    offeringGroupRewardText: string;
    offerings: Offerings[]
}
