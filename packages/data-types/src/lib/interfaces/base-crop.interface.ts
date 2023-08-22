import { MinimalItem } from "@ci/data-types";
import { Season } from "../enums/season.enum";

export interface BaseCrop {
    key: string;
    item: MinimalItem & { price: number };
    growableSeason: Season[],
    dropData:
        {
            itemId: string;
            item: MinimalItem & { sellPrice: number };
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
