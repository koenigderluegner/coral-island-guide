import { readAsset } from '../util/functions';
import { Critter, Item } from '@ci/data-types';
import { BugsAndInsects } from '../types/bugs-and-insects.type';
import { BugAndInsect } from '../interfaces/bug-and-insect.interface';
import { addSpacesToPascalCase, getEnumValue } from '@ci/util';
import { WildlifeSeaCrittersRegistryDbGenerator } from "./wildlife-sea-critters-registry-db.generator";
import { WildlifeSeaCrittersRegistry } from "../interfaces/wildlife-sea-critters-registry.interface";

export class BugsAndInsectsDbGenerator {

    critterDb: BugsAndInsects[];
    private wildlifeRegistry: WildlifeSeaCrittersRegistry[];

    constructor(protected itemMap: Map<string, Item>,
                protected _assetPath = 'ProjectCoral/Content/ProjectCoral/Bugs/DT_BugsAndInsects.json',
                protected _wildlifeRegistry = 'ProjectCoral/Content/ProjectCoral/Placables/WildLife/DT_WildLifeRegistry.json',
                protected _gridZones = 'ProjectCoral/Content/ProjectCoral/Grid/DT_GridZones.json',) {

        this.critterDb = readAsset<BugsAndInsects[]>(this._assetPath);
        const wildlifeSeaCrittersRegistryDbGenerator = new WildlifeSeaCrittersRegistryDbGenerator(_wildlifeRegistry, _gridZones);
        this.wildlifeRegistry = [...wildlifeSeaCrittersRegistryDbGenerator.generate().values()];

    }

    generate(): Map<string, Critter> {
        const map: Map<string, Critter> = new Map<string, Critter>();

        Object.keys(this.critterDb[0]?.Rows).forEach(itemKey => {


            if (itemKey === 'GHOST') return;

            const dbItem: BugAndInsect = this.critterDb[0]?.Rows[itemKey];

            const item: Item | undefined = this.itemMap.get(dbItem.BugsAndInsectsSKU.itemID);

            // the keys in wildlife registry don't match the ones from entity table, so we need to check over the type
            const bugType = 'ObjectName' in dbItem.bugType ? dbItem.bugType.ObjectName : dbItem.bugType.AssetPathName;
            const wildlifeRegistry = this.wildlifeRegistry.find(wildlife => wildlife.type === bugType);

            if (!wildlifeRegistry) {
                console.warn('Missing data for wildlife entry', itemKey)
                return;
            }

            const {type, ...wildlifeData} = wildlifeRegistry

            if (item) {
                const insect: Critter = {
                    key: itemKey,
                    rarity: addSpacesToPascalCase(getEnumValue(dbItem.rarity)),
                    minCaughtSize: dbItem.minCaughtSize,
                    maxCaughtSize: dbItem.maxCaughtSize,
                    bugsBehaviourPreset: dbItem.bugsBehaviourPreset.RowName,
                    item,
                    ...wildlifeData
                };

                map.set(insect.key, insect);
            }


        });

        return map;
    }
}
