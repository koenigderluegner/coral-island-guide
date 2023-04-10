import { MinimalItem } from "@ci/data-types";

export interface OfferingReward {
    items: { item: MinimalItem, amount: number }[]
    recipes: {
        item: MinimalItem,
        cookingKey: string;
    }[]
}
