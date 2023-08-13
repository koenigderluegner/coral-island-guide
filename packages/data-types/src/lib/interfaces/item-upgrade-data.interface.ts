import { MinimalItem } from "../types/minimal-item.type";

export interface ItemUpgradeData {
    price: number;
    daysDelay: number;
    unlockRequirements: { item: MinimalItem, amount: number; }[]
    requirements: { item: MinimalItem, amount: number; }[]
    hardnessLevel: string;
    toolType: string;
    townRank: number;
    item: MinimalItem,
    useCustomIcon: boolean,
    customIcon: string | null;
    useCategory: boolean;
    category: string;
    priority: number;
    priceOverride: number;
    tag: string[]
}
