import { Item } from './item.interface';
import { BaseCrop } from "./base-crop.interface";

export interface Crop extends BaseCrop {
    isTrellisCrop: boolean,
    isScytheRequired: boolean,
    pickupableItemId: string;
    pickupableItem?: Item
    canCombine: boolean,
    chanceToCombine: { chance: number }
}
