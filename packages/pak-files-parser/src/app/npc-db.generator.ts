import { BaseGenerator } from './base-generator.class';
import { Item, NPC } from '@ci/data-types';
import { Datatable } from '../interfaces/datatable.interface';
import { convertToIconName, getSourceStringResult, readAsset } from '../util/functions';
import { RawNPC } from '../interfaces/raw-npc.interface';
import { addSpacesToPascalCase, getEnumValue } from '@ci/util';
import { RawNpcAppearances } from "../interfaces/raw-npc-appearances.interface";
import { Logger } from "../util/logger.class";
import path from "path";
import { environment } from "../environments/environment";
import fs from "fs";

export class NPCDbGenerator extends BaseGenerator<RawNPC, NPC> {

    datatable: Datatable<RawNPC>[];


    constructor(protected itemMap: Map<string, Item>, filepath: string) {
        super();
        this.datatable = readAsset(filepath);
    }

    handleEntry(itemKey: string, dbItem: RawNPC): NPC {

        const objectName = dbItem.mapIcon.AssetPathName.split('.').pop() ?? '';


        const [portaitsPath, index] = dbItem.portraitsDT.ObjectPath.split('.');
        let npcAppearances: Record<string, RawNpcAppearances> = {}
        const fileName = path.join(portaitsPath + '.json');
        try {
            npcAppearances = readAsset<Datatable<RawNpcAppearances>[]>(fileName)[+index].Rows;
        } catch (e) {
            Logger.warn(`Can't find NPC appearances for ${itemKey} at path ${fileName}`)
        }


        const portraitPath = dbItem.Portrait.AssetPathName.replace('/Game/ProjectCoral/', '/ProjectCoral/Content/ProjectCoral/').split('.')[0];
        let headerPortraitFileName: string | null = null
        let customHead;

        const sourceImagePath = path.join(environment.assetPath, portraitPath + '.png');
        if (!fs.existsSync(sourceImagePath) || portraitPath === 'None') {


            const customPath = path.join(...environment.assetPath.split(path.sep).slice(0, -1), 'custom', 'head-portraits', itemKey + '.png');

            if (fs.existsSync(customPath)) {
                Logger.info(`Found custom header image for ${itemKey}`);
                headerPortraitFileName = itemKey;
                customHead = true as const;
            } else {
                Logger.warn(`Can't find head portrait source image for ${itemKey}.`, sourceImagePath);

            }

        } else {

            headerPortraitFileName = portraitPath.split('/').pop() ?? null
        }


        const appearances: NPC['appearances'] = {};

        Object.keys(npcAppearances).forEach(npcAppearanceKey => {
            const npcAppearance = npcAppearances[npcAppearanceKey]

            npcAppearance.images.forEach(imageDefinition => {
                const assetPath = imageDefinition.texture.AssetPathName.replace('/Game/ProjectCoral/', '/ProjectCoral/Content/ProjectCoral/').split('.')[0];
                if (assetPath === 'None') return;
                const emotion = imageDefinition.EmotionRow.RowName;

                const sourceImagePath = path.join(environment.assetPath, assetPath + '.png');

                if (!fs.existsSync(sourceImagePath)) return;

                if (!appearances[npcAppearanceKey]) {
                    appearances[npcAppearanceKey] = {}
                }

                appearances[npcAppearanceKey][emotion] = assetPath.split('/').pop() ?? '';


            })


        })


        return {
            key: itemKey,
            canHaveRelationships: dbItem.canHaveRelationships,
            canInteract: dbItem.canInteract,
            canReceiveGifts: dbItem.canReceiveGifts,
            isDateable: dbItem.isDateable,
            // TODO get name from translation file
            characterName: addSpacesToPascalCase(getSourceStringResult(dbItem.CharacterName)),
            characterCategory: getEnumValue(dbItem.CharacterCategory),
            description: getSourceStringResult(dbItem.Description),
            iconName: convertToIconName(objectName).replace('.png', ''),
            appearances,
            headerPortraitFileName,
            customHead
        };

    }


}
