import { MinimalItem } from "../types/minimal-item.type";

export interface AnimalData {
    key: string;
    variants: {
        variant: string;
        icons: {
            adult: string | null;
        }
    }[];
    building: string;
// still used?
    daysToGrow: number;
    harvestCooldown: number;
    animalProduceType: string;
    produceDropLocation: string;
    baseProduceDropChance: number;
    incrementProduceDropChance: number;
    itemHarvestTool: MinimalItem | undefined;
    produces: {
        minimumFriendshipLevelToSpawn: number;
        small: MinimalItem | undefined;
        large: MinimalItem | undefined;
        smallGolden: MinimalItem | undefined;
        largeGolden: MinimalItem | undefined;
    }[]
}
