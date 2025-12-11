import { TranslationKey } from "./translation-key";
import { MinimalItem, } from "./minimal-item.type";
import { Item } from "../interfaces/item.interface";
import { TownRankPoints } from "./town-rank-points";
import { MinimalNPC } from "./minimal-npc.type";

export type Attraction = {
    key: string,
    projectImage: string
    projectIcon: string
    requirements: { item: MinimalItem, amount: number }[]
    daysToComplete: number,
    perkData: {
        description: TranslationKey | null,
        icon: string,

    }[]
    rewards: {
        townRank: TownRankPoints,
        heartPoints: MinimalNPC[]
    },
    contractors: {
        contractor: TranslationKey | null,
        npcs: MinimalNPC[]
        npcImages: string[]
    }
    townRank: number,
    item: Item | undefined,
    name: TranslationKey | null,
    category: TranslationKey | null,
    description: TranslationKey | null,
    order: number,
    price: number
}
