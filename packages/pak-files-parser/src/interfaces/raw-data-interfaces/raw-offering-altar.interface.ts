import { SourceString } from "../../types/source-string.type";

export interface RawOfferingAltar {
    offeringGroupTitle: SourceString,
    offeringGroupRewardText: SourceString,
    offeringId: string[]
    isHeritageOffering: boolean;
}
