import { MinimalItem } from "@ci/data-types";

export type UnlockSpecialItemEffect = {
    type: 'UnlockSpecialItem',
    meta: {
        item: MinimalItem
    }
}
