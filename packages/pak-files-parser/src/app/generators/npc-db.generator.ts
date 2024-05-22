import { BaseGenerator } from './base-generator.class';
import { CalendarBirthday, CalendarEvent, Item, NPC, SpecificDate } from '@ci/data-types';
import { Datatable } from '../../interfaces/datatable.interface';
import { convertToIconName, extractOutfitPortraitsLocation, readAsset } from '../../util/functions';
import { RawNPC } from '../../interfaces/raw-data-interfaces/raw-npc.interface';
import { addSpacesToPascalCase, getEnumValue } from '@ci/util';
import { RawNpcAppearances } from "../../interfaces/raw-data-interfaces/raw-npc-appearances.interface";
import path from "path";
import { environment } from "../../environments/environment";
import fs from "fs";
import { StringTable } from "../../util/string-table.class";
import { Logger } from "../../util/logger.class";

export class NPCDbGenerator extends BaseGenerator<RawNPC, NPC> {

    datatable: Datatable<RawNPC>[];
    petNPCs: Datatable<RawNPC>[];
    birthdays: CalendarBirthday[] = []


    constructor(protected itemMap: Map<string, Item>, filepath: string, protected calendarMap: Map<string, CalendarEvent[]>, protected additionalMappings: {
        npcKey: string,
        appearanceName: string,
        outfitKey: string
    }[] = []) {
        super();
        this.datatable = readAsset(filepath);
        this.petNPCs = readAsset('ProjectCoral/Content/ProjectCoral/AdoptablePets/NPC/DT_PetNPCs.json');
        if (this.calendarMap) {
            this.birthdays = [...this.calendarMap.values()][0].filter((e): e is CalendarBirthday => e.eventType === "birthday");
        }
    }

    private static formatRawAppearances(npcAppearances: Record<string, RawNpcAppearances>) {
        const defaultAppearance: NPC['appearances'][0]["appearances"] = {}
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

                if (!defaultAppearance[npcAppearanceKey]) {
                    defaultAppearance[npcAppearanceKey] = {}
                }

                defaultAppearance[npcAppearanceKey][emotion] = assetPath.split('/').pop() ?? '';


            })


        })
        return defaultAppearance;
    }

    private static getNPCAppearances(dbItem: RawNPC, itemKey: string) {
        let npcAppearances: Record<string, RawNpcAppearances> = {}
        let {index, fileName} = extractOutfitPortraitsLocation(dbItem, itemKey);

        try {
            npcAppearances = readAsset<Datatable<RawNpcAppearances>[]>(fileName)[+index].Rows;
        } catch (e) {
            Logger.error(`Can't open character outfit file for ${dbItem.characterID}`)
        }
        return npcAppearances;
    }

    handleEntry(itemKey: string, dbItem: RawNPC): NPC {

        const petNPC = this.petNPCs[0]?.Rows[itemKey];
        if (petNPC) {
            dbItem = petNPC;
        }

        const objectName = dbItem.mapIcon.AssetPathName.split('.').pop() ?? '';


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
        const appearances: NPC['appearances'] = [];

        let npcAppearances = NPCDbGenerator.getNPCAppearances(dbItem, itemKey);
        const defaultAppearance = NPCDbGenerator.formatRawAppearances(npcAppearances);
        appearances.push({appearances: defaultAppearance});

        this.additionalMappings
            .filter(mapping => mapping.npcKey === itemKey)
            .forEach(mapping => {

                // set to null so it doenst auto-detect, maybe FIXME ?
                let additionalAppearance = NPCDbGenerator.getNPCAppearances({
                    ...dbItem,
                    portraitsDT: null
                }, mapping.outfitKey);
                const formattedAdditionalAppearance = NPCDbGenerator.formatRawAppearances(additionalAppearance);

                appearances.push({
                    appearanceCategory: mapping.appearanceName,
                    appearances: formattedAdditionalAppearance
                });
            })

        let birthday = this.getBirthday(itemKey);
        if (itemKey === 'Semeru') {
            console.log(appearances)
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

    private getBirthday(itemKey: string): SpecificDate | undefined {

        const foundBirthday = this.birthdays.find(b => b.npcKey === itemKey.toLowerCase())

        if (!foundBirthday) return;

        return {
            day: foundBirthday.day,
            season: foundBirthday.season,
            year: -1
        }

    }
}
