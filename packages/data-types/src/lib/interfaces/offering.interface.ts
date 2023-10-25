import { MinimalItem, MinimalTagBasedItem, Quality } from "@ci/data-types";

export interface Offering {
    item: MinimalItem | MinimalTagBasedItem,
    amount: number,
    quality?: Quality
}
