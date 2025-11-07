import { MinimalItem } from '../types/minimal-item.type';

export interface OfferingReward {
    items: { item: MinimalItem, amount: number }[]
    recipes: {
        item: MinimalItem,
        cookingKey: string;
    }[]
}
