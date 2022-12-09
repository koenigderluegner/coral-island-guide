import { readAsset } from '../util/functions';
import { CraftingUnlockByMastery, Item } from '@ci/data-types';
import { RawCraftingUnlockByMastery } from "../interfaces/raw-crafting-unlock-by-mastery.interface";
import { Datatable } from "../interfaces/datatable.interface";
import { getEnumValue } from "@ci/util";

export class CraftingRecipeUnlockedByMasteryDbGenerator {

    recipesDB: Datatable<RawCraftingUnlockByMastery>[];

    constructor(protected itemMap: Map<string, Item>) {

        // ProjectCoral Content Project Coral Core Data Crafting
        this.recipesDB = readAsset<Datatable<RawCraftingUnlockByMastery>[]>('DT_CraftingUnlockByMastery.json');

    }

    generate(): Map<string, CraftingUnlockByMastery> {
        const map: Map<string, CraftingUnlockByMastery> = new Map<string, CraftingUnlockByMastery>();

        Object.keys(this.recipesDB[0]?.Rows).forEach(itemKey => {

            const dbItem: RawCraftingUnlockByMastery = this.recipesDB[0]?.Rows[itemKey];


            Object.keys(dbItem.unlockRecipe).forEach(typeEnum => {
                dbItem.unlockRecipe[typeEnum].craftingList.forEach(craftingItem => {

                    if (craftingItem.item.itemID === 'None') return;

                    const craftingUnlock: CraftingUnlockByMastery = {
                        key: craftingItem.item.itemID,
                        masteryLevel: dbItem.masteryLevel,
                        masteryType: getEnumValue(typeEnum)
                    }

                    map.set(craftingUnlock.key, craftingUnlock);


                })
            })

        });

        return map;
    }
}
