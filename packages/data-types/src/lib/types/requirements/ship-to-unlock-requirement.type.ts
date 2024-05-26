import { MinimalItem } from "@ci/data-types";

export type ShipToUnlockRequirement = {
    type: 'ShipToUnlock',
    meta: {
        itemsToShip: MinimalItem[],
        includeAllQualities: boolean;
    }
}
