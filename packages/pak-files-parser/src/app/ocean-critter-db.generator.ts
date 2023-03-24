import { BugsAndInsectsDbGenerator } from './bugs-and-insects-db.generator';
import { Item } from '@ci/data-types';

export class OceanCritterDbGenerator extends BugsAndInsectsDbGenerator {

    // ProjectCoral Content Project Coral Bugs Diving
    constructor(protected override itemMap: Map<string, Item>, protected assetPath = 'DT_OceanCritter.json') {
        // ProjectCoral/Content/ProjectCoral/Diving/
        // ProjectCoral/Content/ProjectCoral/Placables/WildLife
        super(itemMap, assetPath, 'DT_OceanCritterRegistry.json', 'DT_GridZones_Diving.json');
    }

}
