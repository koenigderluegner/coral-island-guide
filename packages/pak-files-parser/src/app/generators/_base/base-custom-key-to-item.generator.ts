import { Item, MinimalItem } from "@ci/data-types";
import { minifyItem } from "../../../util/functions";

export abstract class BaseCustomKeyToItemGenerator {

    // keys are lowercased because keys don't follow fixed pattern
    abstract keyToItemId: Record<string, string>;

    constructor(protected itemMap: Map<string, Item>) {
    }

    generate(): Map<string, Record<string, MinimalItem>> {
        const result: Record<string, MinimalItem> = {};

        Object.keys(this.keyToItemId).forEach(key => {
            const item = this.itemMap.get(this.keyToItemId[key]);

            if (!item) return;

            result[key] = minifyItem(item);
        })

        return new Map<string, Record<string, MinimalItem>>([
            ['unused', result]
        ])
    }
}
