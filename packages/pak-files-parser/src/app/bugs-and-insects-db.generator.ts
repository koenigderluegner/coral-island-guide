import { readAsset } from '../util/functions';
import { Item } from '@ci/data-types';
import { BugsAndInsects } from '../types/bugs-and-insects.type';
import { Critter } from '../../../data-types/src/lib/interfaces/critter.interface';
import { BugAndInsect } from '../interfaces/bug-and-insect.interface';

export class BugsAndInsectsDbGenerator {

    critterDb: BugsAndInsects[];

    constructor(protected itemMap: Map<string, Item>, protected _assetPath = 'DT_BugsAndInsects.json') {
        // ProjectCoral Content Project Coral Bugs
        this.critterDb = readAsset<BugsAndInsects[]>(this._assetPath);

    }

    generate(): Map<string, Critter> {
        const map: Map<string, Critter> = new Map<string, Critter>();

        Object.keys(this.critterDb[0]?.Rows).forEach(itemKey => {

            const dbItem: BugAndInsect = this.critterDb[0]?.Rows[itemKey];

            const item: Item | undefined = this.itemMap.get(dbItem.BugsAndInsectsSKU.itemID);

            if (item) {
                const insect: Critter = {
                    key: itemKey,
                    rarity: dbItem.rarity,
                    minCaughtSize: dbItem.minCaughtSize,
                    maxCaughtSize: dbItem.maxCaughtSize,
                    bugsBehaviourPreset: dbItem.bugsBehaviourPreset.RowName,
                    item
                };

                map.set(insect.key, insect);
            }


        });

        return map;
    }
}