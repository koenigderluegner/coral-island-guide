import { BugsAndInsectsDbGenerator } from './bugs-and-insects-db.generator';
import { Item } from '@ci/data-types';

export class OceanCritterDbGenerator extends BugsAndInsectsDbGenerator {

    constructor(protected override itemMap: Map<string, Item>, protected assetPath = 'ProjectCoral/Content/ProjectCoral/Bugs/Diving/DT_OceanCritter.json') {

        super(itemMap,
            assetPath,
            'ProjectCoral/Content/ProjectCoral/Placables/WildLife/DT_OceanCritterRegistry.json',
            'ProjectCoral/Content/ProjectCoral/Diving/DT_GridZones_Diving.json'
        );
    }

}
