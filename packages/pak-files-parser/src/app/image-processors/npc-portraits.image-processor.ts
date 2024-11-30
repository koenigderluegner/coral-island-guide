import { createPathIfNotExists } from "../../util/functions";
import { Logger } from "../../util/logger.class";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import glob from "glob";
import { NPCDbGenerator } from "../generators/npcs/npc-db.generator";

export class NpcPortraitsImageProcessor {


    constructor(protected sourcePath: string, protected portraitOutputPath: string, protected headPortraitOutputPath: string, protected additionalMappings: {
        npcKey: string,
        appearanceName: string,
        outfitKey: string
    }[] = [], protected skipIfExists = true) {
    }

    async process() {
        const sourceImages = NPCDbGenerator.filePaths.appearances
        const sourceImagesHeadPortraits = NPCDbGenerator.filePaths.heads;

        const excludeFromDeletion: Set<string> = new Set<string>()


        Logger.log(`checking ${sourceImagesHeadPortraits.size} head portraits`);
        await this.extractHeadImages(sourceImagesHeadPortraits);
        Logger.success('head portrait extraction done');

        Logger.log(`checking ${sourceImages.size} portraits`);
        await this.extractPortraits(sourceImages, excludeFromDeletion);
        Logger.success('portrait extraction done');

        this.cleanUpUnusedFiles(excludeFromDeletion);


    }


    private async extractPortraits(sourceImages: Set<{
        npcKey: string;
        image: string
    }>, excludeFromDeletion: Set<string>) {
        let counter = 0;
        for (const s of sourceImages) {
            await this._createImages(s.npcKey, s.image, this.portraitOutputPath, {createThumbs: true, trim: true});
            excludeFromDeletion.add(s.image.replace('\\dist', '').replace('\\assets', '\\src\\assets'))
            counter++;
            counter++;
            Logger.progress((counter / (sourceImages.size * 2)) * 100)
        }
    }

    private async extractHeadImages(sourceImagesHeadPortraits: Set<{ npcKey: string; image: string }>) {
        let headCounter = 0;
        for (const s of sourceImagesHeadPortraits) {
            await this._createImages(s.npcKey, s.image, this.headPortraitOutputPath, {
                createThumbs: false,
                trim: false
            });
            headCounter++;
            Logger.progress((headCounter / sourceImagesHeadPortraits.size) * 100)
        }
    }

    private cleanUpUnusedFiles(excludeFromDeletion: Set<string>) {
        glob('**/*.png', {cwd: this.sourcePath,}, async (error: Error | null, filesWithJs: string[]) => {
            if (error) {
                Logger.error(error.message, error);
            }

            if (filesWithJs.length === excludeFromDeletion.size) return;
            Logger.log(`checking ${filesWithJs.length} files for deletion`);
            let counter = 0;
            const portraitsMarkedForDeletetion = [];
            for (const fileBasename of filesWithJs) {
                const sourceFilePath = path.join(this.sourcePath.replace('\\dist', '').replace('\\assets', '\\src\\assets'), fileBasename);

                if (!excludeFromDeletion.has(sourceFilePath) && fs.existsSync(sourceFilePath)) {
                    if (sourceFilePath.toLowerCase().includes('potrait') || sourceFilePath.toLowerCase().includes('portrait')) {
                        portraitsMarkedForDeletetion.push(sourceFilePath)
                    } else {
                        fs.unlinkSync(sourceFilePath);
                    }

                }

                counter++;
                Logger.progress((counter / filesWithJs.length) * 100);

            }
            if (portraitsMarkedForDeletetion.length) {
                Logger.warn(`Tried to delete ${portraitsMarkedForDeletetion.length} portraits`)
                portraitsMarkedForDeletetion.forEach(s => {
                    Logger.warn(`\t${s}`)
                })
            }
            Logger.success('image extraction done');

        });
    }

    private async _createImages(npcKey: string, sourceImagePath: string, outputPath: string, options: {
        trim?: boolean,
        createThumbs?: boolean
    } = {trim: true}) {

        const {trim, createThumbs} = options

        const fileName = this._getFileName(sourceImagePath)

        const webpPath = path.join(outputPath, npcKey, fileName + '.webp');
        const webpThumbsPath = path.join(outputPath, npcKey, 'thumbs', fileName + '.webp');

        const webpTargetExists = fs.existsSync(webpPath);
        const webpThumbsPathExists = fs.existsSync(webpThumbsPath);

        const targetPathParts = webpPath.split(path.sep);
        targetPathParts.pop()
        const targetPath = targetPathParts.join(path.sep)
        createPathIfNotExists(targetPath);

        const targetPathParts2 = webpThumbsPath.split(path.sep);
        targetPathParts2.pop()
        const targetPath2 = targetPathParts2.join(path.sep)
        createPathIfNotExists(targetPath2)
        if (this.skipIfExists && webpTargetExists && webpThumbsPathExists) return;

        const imagesToCreate = [];
        let image
        if (!webpTargetExists) {
            image = sharp(sourceImagePath);

            if (trim) {
                image = image.trim()
            }

            imagesToCreate.push(image.webp().toFile(webpPath))
        }
        if (!webpThumbsPathExists && !!createThumbs) {
            const clone = (image ?? sharp(sourceImagePath).trim()).clone().resize(400, 400, {fit: "inside"})
            imagesToCreate.push(clone.webp().toFile(webpThumbsPath));
        }


        try {
            if (!webpTargetExists || !this.skipIfExists || !webpThumbsPathExists)
                await Promise.all(imagesToCreate)
        } catch (e) {
            console.log(e);
        }
    }

    private _getFileName(sourceImagePath: string): string {
        return (path.join((sourceImagePath.split('/').pop() ?? '').split('\\').pop() ?? '').replace('.png', ''));
    }
}
