import { MinimalItem } from "@ci/data-types";

export type SpecialItemRequirement = {
    type: 'SpecialItem',
    meta: {
        item: MinimalItem
    }
}
