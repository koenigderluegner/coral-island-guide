import { createPathIfNotExists } from "../../util/functions";
import { Logger } from "../../util/logger.class";
import path from "path";
import { config } from "../../config";
import * as fg from 'fast-glob'
import fs from "fs";
import sharp from "sharp";


export class SimpleCopyImageProcessor {

    processedImageNames: Set<string> = new Set<string>();

    constructor(protected mappings: {
        inputGlob: string,
        outputPathSuffix?: string,
        options?: { trim?: boolean, maxHeight?: number, maxWidth?: number }
    }[], protected skipIfExists = true) {


    }

//
    process() {

        this.mappings.forEach(async mapping => {
            const outputPath = path.join(config.assetsPath, mapping.outputPathSuffix?.trim() ?? '');
            const shouldCreateThumbs = mapping.options?.maxWidth || mapping.options?.maxHeight;
            const fullPath = path.join(config.sourceContentPath, mapping.inputGlob);
            const imagePaths = fg.sync(fg.convertPathToPattern(fullPath))
            let amountImagesToCreate = imagePaths.length;
            if (shouldCreateThumbs) amountImagesToCreate *= 2

            createPathIfNotExists(outputPath);
            if (shouldCreateThumbs) createPathIfNotExists(path.join(outputPath, 'thumbs'));

            Logger.log(`checking ${amountImagesToCreate} frames`);
            let counter = 0;
            for (const fileBasename of imagePaths) {

                await this.processImages(fileBasename, {
                    outputPath: outputPath,
                    skipIfExists: this.skipIfExists,
                    ...mapping.options
                })

                counter++;
                if (shouldCreateThumbs) counter++;
                Logger.progress((counter / amountImagesToCreate) * 100);

            }
            Logger.success('image extraction done');


        })
    }

    private async processImages(images: string[] | string, options: {
        outputPath: string,
        skipIfExists: boolean
        trim?: boolean, maxHeight?: number, maxWidth?: number
    }) {
        if (typeof images === 'string') images = [images];
        for (const imagePath of images) {
            const basename = imagePath.split('/').pop() ?? '';


            const targetBasename = basename.replace('.png', '') + '.webp';
            const webpPath = path.join(options.outputPath, targetBasename);

            const webpTargetExists = fs.existsSync(webpPath);

            if (options.skipIfExists && webpTargetExists) continue;

            const image = sharp(imagePath);
            let clone: sharp.Sharp | undefined;
            try {
                if (!webpTargetExists || !options.skipIfExists) {

                    const imagesToCreate = []

                    if (options.trim) image.trim();
                    if (options.maxHeight || options.maxWidth) clone = image.clone().resize(options.maxWidth, options.maxHeight, {fit: "inside"})

                    if (clone) {
                        imagesToCreate.push(clone.webp().toFile(path.join(options.outputPath, 'thumbs', targetBasename)));

                    }
                    imagesToCreate.push(image.webp().toFile(path.join(options.outputPath, targetBasename)))
                    await Promise.all(imagesToCreate)
                }

            } catch (e) {
                console.log(e);
            }


        }
    }


}
