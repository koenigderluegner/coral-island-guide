import { Item } from "@ci/data-types";

export interface BaseCrop {
    key: string;
    item: Item;
    growableSeason: string[],
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
    growTime: number;
    isRegrowable: boolean,
    regrowableLength: number
    overrideExperience: boolean,
    overrideExperienceOnHarvest: number,
    maxDroppedItems: number,
}
