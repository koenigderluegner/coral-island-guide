import { Offerings } from "./offerings.interface";
import { OfferingType } from "../types/offering-type.type";
import { TranslationKey } from "../types/translation-key";

export interface OfferingAltar {
    key: string;
    urlPath: string;
    offeringGroupTitle: TranslationKey;
    offeringGroupRewardText: TranslationKey;
    offerings: Offerings[]
    isHeritageOffering: boolean;
    offeringType: OfferingType
}
