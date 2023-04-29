import { BaseGenerator } from './base-generator.class';
import { GiftPreferences, Item, NPC } from '@ci/data-types';
import { Datatable } from '../interfaces/datatable.interface';
import { getSourceStringResult, readAsset } from '../util/functions';
import { RawNPC } from '../interfaces/raw-npc.interface';
import { addSpacesToPascalCase, getEnumValue } from '@ci/util';

export class NPCDbGenerator extends BaseGenerator<RawNPC, NPC> {

    datatable: Datatable<RawNPC>[] = readAsset('ProjectCoral/Content/ProjectCoral/Core/Data/AI/DT_NPCs.json');
    universalLikes?: GiftPreferences;


    constructor(protected itemMap: Map<string, Item>) {
        super();
    }

    handleEntry(itemKey: string, dbItem: RawNPC): NPC {

        return {
            key: itemKey,
            canHaveRelationships: dbItem.canHaveRelationships,
            canInteract: dbItem.canInteract,
            canReceiveGifts: dbItem.canReceiveGifts,
            isDateable: dbItem.isDateable,
            // TODO get name from translation file
            characterName: addSpacesToPascalCase(getSourceStringResult(dbItem.CharacterName)),
            CharacterCategory: getEnumValue(dbItem.CharacterCategory),
            description: getSourceStringResult(dbItem.Description)
        };

    }


}
