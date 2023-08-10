import { MinimalItem, Quality } from "@ci/data-types";

export interface Offering {
    item: MinimalItem,
    amount: number,
    quality?: Quality
}
