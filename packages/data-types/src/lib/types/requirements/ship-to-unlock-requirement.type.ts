import { MinimalItem } from '../minimal-item.type';

export type ShipToUnlockRequirement = {
    type: 'ShipToUnlock',
    meta: {
        itemsToShip: MinimalItem[],
        includeAllQualities: boolean;
    }
}
