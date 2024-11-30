import { BaseGenerator } from '../_base/base-generator.class';
import { CalendarBirthday, CalendarEvent, Item, NPC, SpecificDate } from '@ci/data-types';
import { Datatable } from '../../../interfaces/datatable.interface';
import {
    convertToIconName,
    extractOutfitPortraitsLocation,
    readAsset,
    unifyInternalPath
} from '../../../util/functions';
import { RawNPC } from '../../../interfaces/raw-data-interfaces/raw-npc.interface';
import { addSpacesToPascalCase, getEnumValue } from '@ci/util';
import { RawNpcAppearances } from "../../../interfaces/raw-data-interfaces/raw-npc-appearances.interface";
import path from "path";
import { environment } from "../../../environments/environment";
import fs from "fs";
import { StringTable } from "../../../util/string-table.class";
import { Logger } from "../../../util/logger.class";
import { AdditionalNpcAppearances } from "./additional-npc-appearances.type";
import * as fg from "fast-glob";
import { config } from "../../../config";
import { knownAppearances, knownEmotions, knownSpecialForms } from "./known-portrait-configurations.const";


export class NPCDbGenerator extends BaseGenerator<RawNPC, NPC> {

    static AdditionalNpcAppearances: AdditionalNpcAppearances[] = [];
    static RanOnce = false;
    static filePaths: {
        appearances: Set<{
            npcKey: string;
            image: string
        }>
        heads: Set<{
            npcKey: string;
            image: string;
            customHead?: true,
            headerPortraitFileName: string | null
        }>
    } = {
        appearances: new Set<{
            npcKey: string;
            image: string;
        }>,
        heads: new Set<{
            npcKey: string;
            image: string,
            customHead?: true,
            headerPortraitFileName: string | null

        }>
    };
    datatable: Datatable<RawNPC>[];
    petNPCs: Datatable<RawNPC>[];
    birthdays: CalendarBirthday[] = []

    constructor(protected itemMap: Map<string, Item>, filepath: string, protected calendarMap: Map<string, CalendarEvent[]>) {
        super();
        this.datatable = readAsset(filepath);
        this.petNPCs = readAsset('ProjectCoral/Content/ProjectCoral/AdoptablePets/NPC/DT_PetNPCs.json');
        if (this.calendarMap) {
            this.birthdays = [...this.calendarMap.values()][0].filter((e): e is CalendarBirthday => e.eventType === "birthday");
        }
    }

    private static formatRawAppearances(npcKey: string, npcAppearances: Record<string, RawNpcAppearances>) {
        const defaultAppearance: NPC['appearances'][0]["appearances"] = {}
        Object.keys(npcAppearances).forEach(npcAppearanceKey => {
            const npcAppearance = npcAppearances[npcAppearanceKey]

            npcAppearance.images.forEach(imageDefinition => {
                const assetPath = unifyInternalPath(imageDefinition.texture.AssetPathName).split('.')[0];
                if (assetPath === 'None') return;
                const emotion = imageDefinition.EmotionRow.RowName;

                const sourceImagePath = path.join(environment.assetPath, assetPath + '.png');

                if (!fs.existsSync(sourceImagePath)) {
                    const guessedPath = sourceImagePath.replace('Potrait', 'Potraits');

                    if (!fs.existsSync(guessedPath)) {
                        return;
                    } else {
                        NPCDbGenerator.filePaths.appearances.add({npcKey, image: guessedPath})
                    }
                } else {
                    NPCDbGenerator.filePaths.appearances.add({npcKey, image: sourceImagePath})
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
        const {index, fileName} = extractOutfitPortraitsLocation(dbItem, itemKey);

        try {
            npcAppearances = readAsset<Datatable<RawNpcAppearances>[]>(fileName)[+index].Rows;
        } catch (e) {
            Logger.error(`Can't open character outfit file for ${dbItem.characterID}`)
        }
        return npcAppearances;
    }

    private static extractAllAppearances(dbItem: RawNPC, itemKey: string) {
        let appearances: NPC['appearances'] = [];

        const npcAppearances = NPCDbGenerator.getNPCAppearances(dbItem, itemKey);
        const defaultAppearance = NPCDbGenerator.formatRawAppearances(itemKey, npcAppearances);
        appearances.push({appearances: defaultAppearance});

        NPCDbGenerator.AdditionalNpcAppearances
            .filter(mapping => mapping.npcKey === itemKey)
            .forEach(mapping => {

                // set to null so it doenst auto-detect, maybe FIXME ?
                const additionalAppearance = NPCDbGenerator.getNPCAppearances({
                    ...dbItem,
                    portraitsDT: null
                }, mapping.outfitKey);
                const formattedAdditionalAppearance = NPCDbGenerator.formatRawAppearances(itemKey, additionalAppearance);

                appearances.push({
                    appearanceCategory: mapping.appearanceName,
                    appearances: formattedAdditionalAppearance
                });
            })


        const foundImages = [...NPCDbGenerator.filePaths.appearances].map(s => s.image).map(s => fg.convertPathToPattern(s));
        const fullPath = config.source.portraitsPath + `/**/${fg.escapePath(itemKey)}/**/Po*traits/**/*.png`;
        const imagePaths = fg.sync(fg.convertPathToPattern(fullPath))

        const filtered = imagePaths.filter(i => !foundImages.includes(i))
        if (filtered.length) {
            appearances = NPCDbGenerator.mergeAppearances(appearances, NPCDbGenerator.getUnmatchedAppearances(filtered));
        }

        return appearances;
    }

    private static extractHeadPortrait(itemKey: string, dbItem: RawNPC) {

        if (NPCDbGenerator.RanOnce) {
            const find = [...NPCDbGenerator.filePaths.heads.values()]
                .find(value => value.npcKey === itemKey);
            return find ?? {headerPortraitFileName: null}
        }

        let headerPortraitFileName: string | null = null
        let customHead;
        const portraitPath = unifyInternalPath(dbItem.Portrait.AssetPathName).split('.')[0];

        const sourceImagePath = path.join(environment.assetPath, portraitPath + '.png');
        const guessedPath = path.join(environment.assetPath, 'ProjectCoral', 'Content', 'ProjectCoral', 'Textures', 'UI', 'NPCHeadPortraits', 'T_Relationship' + itemKey + '.png');
        const customPath = path.join(...environment.assetPath.split(path.sep).slice(0, -1), 'custom', 'head-portraits', itemKey + '.png');
        const guessedPetPath = path.join(environment.assetPath, 'ProjectCoral', 'Content', 'ProjectCoral', 'Textures', 'UI', 'NPCHeadPortraits', 'Pet', 'T_Relationship' + itemKey + '.png');


        if (fs.existsSync(sourceImagePath) && fs.existsSync(guessedPath) && sourceImagePath !== guessedPath) {
            headerPortraitFileName = guessedPath.split(path.sep).at(-1)?.replace('.png', '') ?? null;
            customHead = true as const;

            Logger.info(`Replaced guessed header image with given one for ${itemKey}`);
            NPCDbGenerator.filePaths.heads.add({
                npcKey: itemKey,
                image: guessedPath,
                customHead,
                headerPortraitFileName
            })
        } else if (fs.existsSync(guessedPetPath)) {
            headerPortraitFileName = guessedPetPath.split(path.sep).at(-1)?.replace('.png', '') ?? null;
            customHead = true as const;
            Logger.info(`Guessed  header image for ${itemKey}`);
            NPCDbGenerator.filePaths.heads.add({
                npcKey: itemKey, image: guessedPetPath,
                customHead,
                headerPortraitFileName
            })
        } else if (fs.existsSync(customPath) && fs.existsSync(sourceImagePath) && !sourceImagePath.includes('NPCHeadPortraits')) {
            headerPortraitFileName = itemKey;
            customHead = true as const;
            Logger.warn(`Found custom header image for ${itemKey}. Force overwrite for found source image!`);
            NPCDbGenerator.filePaths.heads.add({
                npcKey: itemKey, image: customPath,
                customHead,
                headerPortraitFileName
            })

        } else if (!fs.existsSync(sourceImagePath) || portraitPath === 'None') {

            if (fs.existsSync(guessedPath)) {
                headerPortraitFileName = guessedPath.split(path.sep).at(-1)?.replace('.png', '') ?? null;
                customHead = true as const;
                Logger.info(`Guessed  header image for ${itemKey}`);
                NPCDbGenerator.filePaths.heads.add({
                    npcKey: itemKey, image: guessedPath,
                    customHead,
                    headerPortraitFileName
                })
            } else if (fs.existsSync(customPath)) {
                headerPortraitFileName = itemKey;
                customHead = true as const;
                Logger.info(`Found custom header image for ${itemKey}`);
                NPCDbGenerator.filePaths.heads.add({
                    npcKey: itemKey, image: customPath,
                    customHead,
                    headerPortraitFileName
                })
            } else {
                if (portraitPath !== "None")
                    Logger.warn(`Can't find head portrait source image for ${itemKey}.`, sourceImagePath);
            }

        } else {
            headerPortraitFileName = portraitPath.split('/').pop() ?? null;
            NPCDbGenerator.filePaths.heads.add({
                npcKey: itemKey, image: sourceImagePath,
                headerPortraitFileName
            })

        }
        return {headerPortraitFileName, customHead};
    }

    private static getUnmatchedAppearances(filtered: string[]) {
        const appearances: NPC['appearances'] = [];
        filtered.forEach(imagePath => {
            const pathParts = imagePath.split('/');

            const portraitsIndex = pathParts.findIndex(p => p.toLowerCase() === 'potraits' || p.toLowerCase() === 'portraits');
            const npcKeyFromPath = pathParts[portraitsIndex - 1];
            const outfitFromPath = pathParts[portraitsIndex + 1];
            const imageOrSpecialForm = pathParts[portraitsIndex + 2];
            const imageOrEmpty = pathParts[portraitsIndex + 3];

            const image = imageOrEmpty ?? imageOrSpecialForm;

            const split = image?.replace('.png', '').split('_');

            let emotion;
            let appearance;
            let specialForm;


            if (split?.length) {

                split.splice(0, 1);

                const appearanceIndex = split.findIndex(s => s.toLowerCase() === outfitFromPath.toLowerCase())
                const knownAppearanceIndex = split.findIndex(s => knownAppearances.includes(s.toLowerCase()));
                const pathAppearanceIsKnown = knownAppearances.includes(outfitFromPath.toLowerCase())

                if (appearanceIndex !== -1) {
                    appearance = outfitFromPath;
                    split.splice(appearanceIndex, 1)
                } else if (knownAppearanceIndex !== -1) {
                    appearance = split[knownAppearanceIndex];
                    split.splice(knownAppearanceIndex, 1)
                } else if (pathAppearanceIsKnown) {
                    appearance = outfitFromPath
                } else {
                    return;
                }

                const knownEmotionIndex = split.findIndex(s => knownEmotions.includes(s.toLowerCase()));

                if (knownEmotionIndex !== -1) {
                    emotion = split[knownEmotionIndex];
                    split.splice(knownEmotionIndex, 1)
                } else if (split.length === 1) {
                    emotion = split[0];
                    split.splice(0, 1)
                } else {
                    return
                }


                if (split.length) {
                    const knownSpecialFormIndex = split.findIndex(s => knownSpecialForms.includes(s.toLowerCase()))
                    if (knownSpecialFormIndex !== 1) {
                        specialForm = split[knownSpecialFormIndex];
                        split.splice(knownSpecialFormIndex, 1)
                    }

                    if (split.length) {
                        Logger.warn('Cannot do suggestion for Portrait: ' + imagePath)
                    }
                }


                appearances.push({
                    appearanceCategory: specialForm,
                    appearances: {[appearance]: {[emotion]: imagePath.replace('.png', '').split('/').pop() ?? ''}}
                })
                NPCDbGenerator.filePaths.appearances.add({npcKey: npcKeyFromPath, image: imagePath})

            }


        })

        return appearances;
    }

    private static mergeAppearances(existing: NPC['appearances'], newOnes: NPC['appearances']): NPC['appearances'] {
        const combined = structuredClone(existing);

        newOnes.forEach(newAppearance => {

            const existingCategory = combined.find(c => c.appearanceCategory === newAppearance.appearanceCategory);
            if (!existingCategory) {
                combined.push(newAppearance)
                return;
            }

            const newAppearancesKeys = Object.keys(newAppearance.appearances);

            newAppearancesKeys.forEach(apKey => {
                    const existingAppearance = existingCategory.appearances[apKey];

                    if (!existingAppearance) {
                        existingCategory.appearances[apKey] = newAppearance.appearances[apKey];
                        return;
                    }

                    const newEmotionKeys = Object.keys(existingAppearance);
                    newEmotionKeys.forEach(newEmotionKey => {
                        const existingAppearanceElement = existingAppearance[newEmotionKey];
                        if (!existingAppearanceElement) {
                            existingAppearance[newEmotionKey] = newAppearance.appearances[apKey][newEmotionKey];
                        }
                    })


                }
            )


        })
        return combined;
    }

    handleEntry(itemKey: string, dbItem: RawNPC): NPC {

        const petNPC = this.petNPCs[0]?.Rows[itemKey];
        if (petNPC) {
            dbItem = petNPC;
        }

        const objectName = dbItem.mapIcon.AssetPathName.split('.').pop() ?? '';

        const {headerPortraitFileName, customHead} = NPCDbGenerator.extractHeadPortrait(itemKey, dbItem);
        const appearances = NPCDbGenerator.extractAllAppearances(dbItem, itemKey);

        const birthday = this.getBirthday(itemKey);

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

    override afterParse = () => {
        NPCDbGenerator.RanOnce = true;
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
