import { Item } from './item.interface';

export interface Crop {
    key: string;
    item: Item;
    growableSeason: string[],
    isTrellisCrop: boolean,
    isScytheRequired: boolean,
    pickupableItemId: string;
    pickupableItem?: Item

    maxDroppedItems: number,

    dropData:
        {
            itemId: string;
            item?: Item;
            dropChance: number,
            dropRange: {
                min: number,
                max: number
            }
        }    [];
    readableName: string,
    size: {
        length: number,
        width: number
    },
    canCombine: boolean,
    chanceToCombine: { chance: number }
    growTime: number;
    isRegrowable: boolean,
    regrowableLength: number
    overrideExperience: boolean,
    overrideExperienceOnHarvest: number
}
