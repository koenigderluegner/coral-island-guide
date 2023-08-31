import { createPathIfNotExists, readAsset } from "../../util/functions";
import { RawNPC } from "../../interfaces/raw-npc.interface";
import { Datatable } from "../../interfaces/datatable.interface";
import { Logger } from "../../util/logger.class";
import { RawNpcAppearances } from "../../interfaces/raw-npc-appearances.interface";
import path from "path";
import fs from "fs";
import { environment } from "../../environments/environment";
import sharp from "sharp";
import glob from "glob";

export class NpcPortraitsImageProcessor {

    datatable: Datatable<RawNPC>[] = readAsset('ProjectCoral/Content/ProjectCoral/Core/Data/AI/DT_NPCs.json');

    constructor(protected sourcePath: string, protected portraitOutputPath: string, protected headPortraitOutputPath: string, protected skipIfExists = true) {
    }

    async process() {
        const npcKeys = Object.keys(this.datatable[0].Rows);
        const sourceImages: Set<{
            npcKey: string;
            image: string
        }> = new Set<{
            npcKey: string;
            image: string
        }>();
        const sourceImagesHeadPortraits: Set<{
            npcKey: string;
            image: string
        }> = new Set<{
            npcKey: string;
            image: string
        }>();

        const excludeFromDeletion: Set<string> = new Set<string>()

        const appearances: {
            npcKey: string;
            emotion: string;
            fileName: string;
            npcAppearanceKey: string
        }[] = []


        npcKeys.forEach(npcKey => {
            const npcData = this.datatable[0].Rows[npcKey];
            const [portaitsPath, index] = npcData.portraitsDT.ObjectPath.split('.');
            let npcAppearances: Record<string, RawNpcAppearances> = {}
            const fileName = path.join(portaitsPath + '.json');
            try {
                npcAppearances = readAsset<Datatable<RawNpcAppearances>[]>(fileName)[+index].Rows;
            } catch (e) {
                Logger.error(e)
                Logger.warn(`Can't find NPC appearances for ${npcKey} at path ${fileName}`)
            }


            const portraitPath = npcData.Portrait.AssetPathName.replace('/Game/ProjectCoral/', '/ProjectCoral/Content/ProjectCoral/').split('.')[0];
            const sourceImagePath = path.join(environment.assetPath, portraitPath + '.png');
            const customPath = path.join(...environment.assetPath.split(path.sep).slice(0, -1), 'custom', 'head-portraits', npcKey + '.png');
            const guessedPath = path.join(environment.assetPath, 'ProjectCoral', 'Content', 'ProjectCoral', 'Textures', 'UI', 'NPCHeadPortraits', 'T_Relationship' + npcKey + '.png');
            const guessedPetPath = path.join(environment.assetPath, 'ProjectCoral', 'Content', 'ProjectCoral', 'Textures', 'UI', 'NPCHeadPortraits', 'Pet', 'T_Relationship' + npcKey + '.png');

            if (fs.existsSync(sourceImagePath) && fs.existsSync(guessedPath) && sourceImagePath !== guessedPath) {
                Logger.info(`Replaced guessed header image with given one for ${npcKey}`);
                sourceImagesHeadPortraits.add({npcKey, image: guessedPath})
            } else if (fs.existsSync(guessedPetPath)) {
                Logger.info(`Guessed  header image for ${npcKey}`);
                sourceImagesHeadPortraits.add({npcKey, image: guessedPetPath})
            } else if (fs.existsSync(customPath) && fs.existsSync(sourceImagePath) && !sourceImagePath.includes('NPCHeadPortraits')) {
                Logger.warn(`Found custom header image for ${npcKey}. Force overwrite for found source image!`);
                sourceImagesHeadPortraits.add({npcKey, image: customPath})
            } else if (!fs.existsSync(sourceImagePath) || portraitPath === "None") {

                if (fs.existsSync(guessedPath)) {
                    Logger.info(`Guessed  header image for ${npcKey}`);
                    sourceImagesHeadPortraits.add({npcKey, image: guessedPath})
                } else if (fs.existsSync(customPath)) {
                    Logger.info(`Found custom header image for ${npcKey}`);
                    sourceImagesHeadPortraits.add({npcKey, image: customPath})
                } else {
                    if (portraitPath !== "None")
                        Logger.warn(`Can't find head portrait source image for ${npcKey}.`, sourceImagePath);

                }


            } else {
                sourceImagesHeadPortraits.add({npcKey, image: sourceImagePath})
            }


            Object.keys(npcAppearances).forEach(npcAppearanceKey => {
                const npcAppearnace = npcAppearances[npcAppearanceKey]

                npcAppearnace.images.forEach(imageDefinition => {
                    const assetPath = imageDefinition.texture.AssetPathName.replace('/Game/ProjectCoral/', '/ProjectCoral/Content/ProjectCoral/').split('.')[0];
                    if (assetPath === 'None') return;
                    const emotion = imageDefinition.EmotionRow.RowName;


                    const sourceImagePath = path.join(environment.assetPath, assetPath + '.png');

                    if (!fs.existsSync(sourceImagePath)) {
                        if (!sourceImagePath.includes('Winter') && !sourceImagePath.includes('Wedding'))
                            Logger.warn('Can\'t find portrait source image.', sourceImagePath);
                        return;
                    }

                    sourceImages.add({npcKey, image: sourceImagePath});
                    appearances.push({
                        fileName: this._getFileName(sourceImagePath),
                        npcKey,
                        emotion,
                        npcAppearanceKey
                    })


                })


            })


        });

        Logger.log(`checking ${sourceImagesHeadPortraits.size} head portraits`);
        let headCounter = 0;
        for (const s of sourceImagesHeadPortraits) {
            await this._createImages(s.npcKey, s.image, this.headPortraitOutputPath, false);
            headCounter++;
            Logger.progress((headCounter / sourceImagesHeadPortraits.size) * 100)
        }

        Logger.success('head portrait extraction done');

        Logger.log(`checking ${sourceImages.size} portraits`);
        let counter = 0;
        for (const s of sourceImages) {
            await this._createImages(s.npcKey, s.image, this.portraitOutputPath);
            excludeFromDeletion.add(s.image.replace('\\dist', '').replace('\\assets', '\\src\\assets'))
            counter++;
            Logger.progress((counter / sourceImages.size) * 100)
        }

        Logger.success('portrait extraction done');


        // [...excludeFromDeletion.values()].forEach(console.log)
        //this.cleanUpUnusedFiles(excludeFromDeletion);


    }

    private cleanUpUnusedFiles(excludeFromDeletion: Set<string>) {
        glob('**/*.png', {cwd: this.sourcePath,}, async (error: Error | null, filesWithJs: string[]) => {
            if (error) {
                Logger.error(error.message, error);
            }
            if (filesWithJs.length === excludeFromDeletion.size) return;
            Logger.log(`checking ${filesWithJs.length} files for deletion`);
            let counter = 0;
            for (const fileBasename of filesWithJs) {
                const sourceFilePath = path.join(this.sourcePath.replace('\\dist', '').replace('\\assets', '\\src\\assets'), fileBasename)
                if (!excludeFromDeletion.has(sourceFilePath) && fs.existsSync(sourceFilePath)) {
                    fs.unlinkSync(sourceFilePath);
                }

                counter++;
                Logger.progress((counter / filesWithJs.length) * 100);

            }
            Logger.success('image extraction done');

        });
    }

    private async _createImages(npcKey: string, sourceImagePath: string, outputPath: string, trim = true) {


        const fileName = this._getFileName(sourceImagePath)

        const webpPath = path.join(outputPath, npcKey, fileName + '.webp');

        const webpTargetExists = fs.existsSync(webpPath);

        const targetPathParts = webpPath.split(path.sep);
        targetPathParts.pop()
        const targetPath = targetPathParts.join(path.sep)
        createPathIfNotExists(targetPath)
        if (this.skipIfExists && webpTargetExists) return;


        let image = sharp(sourceImagePath);

        if (trim) {
            image = image.trim()
        }

        try {
            if (!webpTargetExists || !this.skipIfExists)
                await image.webp().toFile(webpPath);
        } catch (e) {
            console.log(e);
        }
    }

    private _getFileName(sourceImagePath: string): string {
        return path.join((sourceImagePath.split(path.sep).pop() ?? '').replace('.png', ''));
    }
}
