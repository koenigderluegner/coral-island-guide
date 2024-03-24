import { BaseCustomKeyToItemGenerator } from "./base-custom-key-to-item.generator";
import { Item } from "@ci/data-types";

export class ItemProcessorMapGenerator extends BaseCustomKeyToItemGenerator {


    // keys are lowercased because keys don't follow fixed pattern
    keyToItemId = {
        barrel: 'item_65022',
        beehouse: 'item_65016',
        cheesepress: 'item_65018',
        compostbin: 'item_65299',
        dehydrator: 'item_94067',
        dyemakermachine: 'item_65059',
        extractor: 'item_65035',
        keg: 'item_65020',
        kiln: 'item_65203',
        loom: 'item_65019',
        mayonisemachine: 'item_65015',
        mill: 'item_110007',
        oilpress: 'item_65021',
        preservejar: 'item_65017',
        recycling: 'item_65049',
        seedmaker: 'item_65048',
        slimeofreplicator: 'item_65268',
        slimeoftransmutation: 'item_65316',
        yoghurtmachine: 'item_65047',
    }

    constructor(itemMap: Map<string, Item>) {
        super(itemMap);
    }
}
