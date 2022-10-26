import { generateJson } from './util/functions';
import { ItemDbGenerator } from './app/item-db.generator';
import { CraftingRecipeDbGenerator } from './app/crafting-recipe-db.generator';
import glob from 'glob';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { Item } from '@ci/data-types';
import { BugsAndInsectsDbGenerator } from './app/bugs-and-insects-db.generator';
import { OceanCritterDbGenerator } from './app/ocean-critter-db.generator';
import { FishDbGenerator } from './app/fish-db.generator';

const itemDbGenerator = new ItemDbGenerator();
const itemDbMap = itemDbGenerator.generate();

const generators: Record<string, { generate: () => Map<string, any> }> = {
    items: itemDbGenerator,
    'crafting-recipes': new CraftingRecipeDbGenerator(itemDbMap),
    'bugs-and-insects': new BugsAndInsectsDbGenerator(itemDbMap),
    'ocean-critters': new OceanCritterDbGenerator(itemDbMap),
    'fish': new FishDbGenerator(itemDbMap),
};

const texturePath = path.join(__dirname, 'assets', 'Textures', 'AtlasImport', 'Frames',);

interface Frame {
    "Type": "PaperSprite",
    "Name": "Stone_Portrait_png1",
    "Properties": {
        "BakedSourceUV": {
            "X": 3328.0,
            "Y": 2325.0
        },
        "BakedSourceDimension": {
            "X": 128.0,
            "Y": 128.0
        },
        "BakedSourceTexture": {
            "ObjectName": "Texture2D T_AtlasItems_2",
            "ObjectPath": "ProjectCoral/Content/ProjectCoral/Textures/AtlasImport/Textures/T_AtlasItems_2.0"
        },
    }
}

const items: Item[] = [...itemDbMap.values()];

function extractImages(): void {

    const generatedDirPAth = path.join(__dirname, 'generated', 'images', 'icons');


    glob('*', {cwd: texturePath}, (error: Error | null, filesWithJs: string[]) => {
        if (error) {
            console.log(error);
        }
        filesWithJs.forEach(async fileBasename => {
            const data: Frame = JSON.parse(fs.readFileSync(path.join(texturePath, fileBasename), {
                encoding: 'utf8',
                flag: 'r'
            })).filter((a: Frame) => a.Type === 'PaperSprite')[0];

            let find = items.find(item => item.iconMeta?.ObjectName === data.Type + ' ' + data.Name);


            const imageMetaData = {
                fileName: find?.iconName,
                width: data.Properties.BakedSourceDimension.X,
                height: data.Properties.BakedSourceDimension.Y,
                top: data.Properties.BakedSourceUV?.Y ?? 0,
                left: data.Properties.BakedSourceUV?.X ?? 0,
                sourceImage: data.Properties.BakedSourceTexture.ObjectName.split(' ')[1],
            };

            const image = sharp(path.join(__dirname, 'assets', 'images', imageMetaData.sourceImage + '.png'));

            if (imageMetaData.fileName)
                image.extract(imageMetaData).png().toFile(path.join(generatedDirPAth, imageMetaData.fileName)).catch((err: any) => {
                    console.log(imageMetaData, find, data);
                    console.log(err);
                });


        });


    });
}

// extractImages();


Object.keys(generators).forEach(generatorName => {
        const generatedMap = generators[generatorName].generate();
        generateJson(`${generatorName}.json`, [...generatedMap.values()]);
    }
);
