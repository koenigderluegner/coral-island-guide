import { MinimalItem } from "@ci/data-types";

export interface CraftingUnlockByMastery {
    masteryLevel: number,
    masteryType: string,
    key: string;
    item?: MinimalItem
}
