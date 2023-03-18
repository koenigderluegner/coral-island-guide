import { Item, UnlockByMastery } from '@ci/data-types';
import { RawUnlockByMastery } from "../interfaces/raw-unlock-by-mastery.interface";
import { Datatable } from "../interfaces/datatable.interface";
import { getEnumValue } from "@ci/util";

export abstract class UnlockedByMasteryDbGenerator {
    abstract recipesDB: Datatable<RawUnlockByMastery>[];

    constructor(protected itemMap: Map<string, Item>) {
    }

    generate(): Map<string, UnlockByMastery> {
        const map: Map<string, UnlockByMastery> = new Map<string, UnlockByMastery>();

        Object.keys(this.recipesDB[0]?.Rows).forEach(itemKey => {

            const dbItem: RawUnlockByMastery = this.recipesDB[0]?.Rows[itemKey];


            Object.keys(dbItem.unlockRecipe).forEach(typeEnum => {
                dbItem.unlockRecipe[typeEnum].craftingList.forEach(craftingItem => {

                    if (craftingItem.item.itemID === 'None') return;

                    const unlockByMastery: UnlockByMastery = {
                        key: craftingItem.item.itemID,
                        masteryLevel: dbItem.masteryLevel,
                        masteryType: getEnumValue(typeEnum)
                    }

                    map.set(unlockByMastery.key, unlockByMastery);


                })
            })

        });

        return map;
    }
}
