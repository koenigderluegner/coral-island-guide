import { Offerings } from "./offerings.interface";
import { OfferingType } from "../types/offering-type.type";

export interface OfferingAltar {
    key: string;
    urlPath: string;
    offeringGroupTitle: string;
    offeringGroupRewardText: string;
    offerings: Offerings[]
    isHeritageOffering: boolean;
    offeringType: OfferingType
}
