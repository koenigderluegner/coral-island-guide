import { Item } from "@ci/data-types";
import { BaseCustomKeyToItemGenerator } from "./base-custom-key-to-item.generator";

export class CookingUtensilMapGenerator extends BaseCustomKeyToItemGenerator {


    // keys are lowercased because keys don't follow fixed pattern
    keyToItemId = {
        oven: 'item_94059',
        blender: 'item_94058',
        chefknife: 'item_94056',
        fryingpan: 'item_94061',
        skillet: 'item_94060',
        grill: 'item_94062',
        pot: 'item_94064',
        seasoningset: 'item_94065',
        ceramicbowl: 'item_94057',
    }

    constructor(itemMap: Map<string, Item>) {
        super(itemMap);
    }
}
