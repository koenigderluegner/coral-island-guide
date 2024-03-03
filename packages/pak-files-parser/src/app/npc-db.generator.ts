import { BaseGenerator } from './base-generator.class';
import { CalendarBirthday, CalendarEvent, Item, NPC, SpecificDate } from '@ci/data-types';
import { Datatable } from '../interfaces/datatable.interface';
import { convertToIconName, extractOutfitPortraitsLocation, readAsset } from '../util/functions';
import { RawNPC } from '../interfaces/raw-data-interfaces/raw-npc.interface';
import { addSpacesToPascalCase, getEnumValue } from '@ci/util';
import { RawNpcAppearances } from "../interfaces/raw-data-interfaces/raw-npc-appearances.interface";
import path from "path";
import { environment } from "../environments/environment";
import fs from "fs";
import { StringTable } from "../util/string-table.class";
import { Logger } from "../util/logger.class";

export class NPCDbGenerator extends BaseGenerator<RawNPC, NPC> {

    datatable: Datatable<RawNPC>[];
    petNPCs: Datatable<RawNPC>[];
    birthdays: CalendarBirthday[] = []


    constructor(protected itemMap: Map<string, Item>, filepath: string, protected calendarMap?: Map<string, CalendarEvent[]>) {
        super();
        this.datatable = readAsset(filepath);
        this.petNPCs = readAsset('ProjectCoral/Content/ProjectCoral/AdoptablePets/NPC/DT_PetNPCs.json');
        if (this.calendarMap) {
            this.birthdays = [...this.calendarMap.values()][0].filter((e): e is CalendarBirthday => e.eventType === "birthday");
        }
    }

    handleEntry(itemKey: string, dbItem: RawNPC): NPC {

        const petNPC = this.petNPCs[0]?.Rows[itemKey];
        if (petNPC) {
            dbItem = petNPC;
        }

        const objectName = dbItem.mapIcon.AssetPathName.split('.').pop() ?? '';

        let npcAppearances: Record<string, RawNpcAppearances> = {}
        let {index, fileName} = extractOutfitPortraitsLocation(dbItem, itemKey);

        try {
            npcAppearances = readAsset<Datatable<RawNpcAppearances>[]>(fileName)[+index].Rows;
        } catch (e) {
            Logger.error(`Can't open character outfit file for ${dbItem.characterID}`)
        }

        const portraitPath = dbItem.Portrait.AssetPathName.replace('/Game/ProjectCoral/', '/ProjectCoral/Content/ProjectCoral/').split('.')[0];
        let headerPortraitFileName: string | null = null
        let customHead;

        const sourceImagePath = path.join(environment.assetPath, portraitPath + '.png');
        const guessedPath = path.join(environment.assetPath, 'ProjectCoral', 'Content', 'ProjectCoral', 'Textures', 'UI', 'NPCHeadPortraits', 'T_Relationship' + itemKey + '.png');
        const customPath = path.join(...environment.assetPath.split(path.sep).slice(0, -1), 'custom', 'head-portraits', itemKey + '.png');
        const guessedPetPath = path.join(environment.assetPath, 'ProjectCoral', 'Content', 'ProjectCoral', 'Textures', 'UI', 'NPCHeadPortraits', 'Pet', 'T_Relationship' + itemKey + '.png');

        if (fs.existsSync(sourceImagePath) && fs.existsSync(guessedPath) && sourceImagePath !== guessedPath) {
            headerPortraitFileName = guessedPath.split(path.sep).at(-1)?.replace('.png', '') ?? null;
            customHead = true as const;
        } else if (fs.existsSync(guessedPetPath)) {
            headerPortraitFileName = guessedPetPath.split(path.sep).at(-1)?.replace('.png', '') ?? null;
            customHead = true as const;
        } else if (fs.existsSync(customPath) && fs.existsSync(sourceImagePath) && !sourceImagePath.includes('NPCHeadPortraits')) {
            headerPortraitFileName = itemKey;
            customHead = true as const;
        } else if (!fs.existsSync(sourceImagePath) || portraitPath === 'None') {

            if (fs.existsSync(guessedPath)) {
                headerPortraitFileName = guessedPath.split(path.sep).at(-1)?.replace('.png', '') ?? null;
                customHead = true as const;
            } else if (fs.existsSync(customPath)) {
                headerPortraitFileName = itemKey;
                customHead = true as const;
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

                if (!fs.existsSync(sourceImagePath)) {
                    const guessedPath = sourceImagePath.replace('Potrait', 'Potraits');

                    if (!fs.existsSync(guessedPath)) return;
                }

                if (!appearances[npcAppearanceKey]) {
                    appearances[npcAppearanceKey] = {}
                }

                appearances[npcAppearanceKey][emotion] = assetPath.split('/').pop() ?? '';


            })


        })

        let birthday: SpecificDate | undefined;

        const foundBirthday = this.birthdays.find(b => b.npcKey === itemKey.toLowerCase())

        if (foundBirthday) {
            birthday = {
                day: foundBirthday.day,
                season: foundBirthday.season,
                year: -1
            }
        }

        return {
            key: itemKey,
            canHaveRelationships: dbItem.canHaveRelationships,
            canInteract: dbItem.canInteract,
            canReceiveGifts: dbItem.canReceiveGifts,
            isDateable: dbItem.isDateable,
            // TODO get name from translation file
            characterName: addSpacesToPascalCase(StringTable.getString(dbItem.CharacterName) ?? ''),
            characterCategory: getEnumValue(dbItem.CharacterCategory),
            description: StringTable.getString(dbItem.Description) ?? '',
            iconName: convertToIconName(objectName).replace('.png', ''),
            appearances,
            headerPortraitFileName,
            customHead,
            birthday
        };

    }


}
