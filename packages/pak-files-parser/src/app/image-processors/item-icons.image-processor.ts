import { convertToIconName, createPathIfNotExists } from "../../util/functions";
import glob from "glob";
import { Logger } from "../../util/logger.class";
import fs from "fs";
import path from "path";
import { Frame } from "../../interfaces/frame.interface";
import { environment } from "../../environments/environment";
import sharp from "sharp";


export class ItemIconsImageProcessor {


    filesToDelete: string[] = []

    constructor(protected sourcePath: string, protected outputPath: string, protected skipIfExists = true) {


    }


    process() {


        createPathIfNotExists(this.outputPath);


        glob('**/*.json', {cwd: this.sourcePath,}, async (error: Error | null, filesWithJs: string[]) => {
            if (error) {
                Logger.error(error.message, error);
            }
            Logger.log(`checking ${filesWithJs.length} frames`);
            let counter = 0;
            for (const fileBasename of filesWithJs) {


                await this.createImages(fileBasename, this.skipIfExists);


                counter++;
                Logger.progress((counter / filesWithJs.length) * 100);

            }
            Logger.success('image extraction done');

            if (this.filesToDelete.length) {
                this._deleteFramelessFiles();
            }


        });
    }

    async createImages(fileBasename: string, skipIfExists: boolean) {
        const frameFilePath = path.join(this.sourcePath, fileBasename);
        const data: Frame | undefined = JSON.parse(fs.readFileSync(frameFilePath, {
            encoding: 'utf8',
            flag: 'r'
        })).filter((a: Frame) => a.Type === 'PaperSprite')[0];

        if (!data) {
            this.filesToDelete.push(frameFilePath);
            return;
        }


        const fileName = convertToIconName(data.Name).replace('.png', '');
        const webpPath = path.join(this.outputPath, fileName + '.webp');

        const webpTargetExists = fs.existsSync(webpPath);
        if (skipIfExists  && webpTargetExists) return;

        const filePath = data.Properties.BakedSourceTexture.ObjectPath.split('.');
        filePath.pop()

        const imageMetaData = {
            fileName,
            width: data.Properties.BakedSourceDimension.X,
            height: data.Properties.BakedSourceDimension.Y,
            top: data.Properties.BakedSourceUV?.Y ?? 0,
            left: data.Properties.BakedSourceUV?.X ?? 0,
            sourceImage: filePath.join('.'),
        };

        const sourceImagePath = path.join(environment.assetPath, imageMetaData.sourceImage + '.png');

        const image = sharp(sourceImagePath);

        if (imageMetaData.fileName) {
            try {
                const sourceImage = image.extract(imageMetaData);
                if (!webpTargetExists || !skipIfExists)
                    await sourceImage.webp().toFile(path.join(this.outputPath, imageMetaData.fileName + '.webp'));
            } catch (e) {
                console.log(e);
            }


        }
    }

    private _deleteFramelessFiles() {
        let counter = 0
        Logger.info(`found ${this.filesToDelete.length} useless frames. Trying to delete...`);
        this.filesToDelete.forEach(path => {
            const sourceFilePath = path.replace('\\dist', '').replace('\\assets', '\\src\\assets')
            if (fs.existsSync(sourceFilePath)) {
                fs.unlinkSync(sourceFilePath);
            }
            counter++;
            Logger.progress((counter / this.filesToDelete.length) * 100);

        })

        this.filesToDelete = [];
    }

}
