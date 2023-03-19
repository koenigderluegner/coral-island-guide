import { MinimalItem } from "@ci/data-types";

export interface UnlockByMastery {
    masteryLevel: number,
    masteryType: string,
    key: string;
    item?: MinimalItem
}
