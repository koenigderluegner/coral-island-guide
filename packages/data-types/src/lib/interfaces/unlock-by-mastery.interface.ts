import { MinimalItem } from '../types/minimal-item.type';

export interface UnlockByMastery {
    masteryLevel: number,
    masteryType: string,
    key: string;
    item?: MinimalItem
}
