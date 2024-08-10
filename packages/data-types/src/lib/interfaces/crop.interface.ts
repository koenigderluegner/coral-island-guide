import { BaseCrop } from "./base-crop.interface";
import { MinimalItem } from "../types/minimal-item.type";

export interface Crop extends BaseCrop {
    isTrellisCrop: boolean,
    isScytheRequired: boolean,
    pickupableItemId: string;
    pickupableItem?: MinimalItem
    canCombine: boolean,
    regrowableLimit?: number
    chanceToCombine: { chance: number }
}
