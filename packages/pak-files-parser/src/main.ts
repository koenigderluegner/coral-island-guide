import { generateJson } from './util/functions';
import { ItemDbGenerator } from './app/item-db.generator';
import { CraftingRecipeDbGenerator } from './app/crafting-recipe-db.generator';
import glob from 'glob';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { Item } from '@ci/data-types';


const itemDbGenerator = new ItemDbGenerator();
const itemDbMap = itemDbGenerator.generate();

const recipeDbGenerator: CraftingRecipeDbGenerator = new CraftingRecipeDbGenerator(itemDbMap);
const craftingRecipeDbMap = recipeDbGenerator.generate();

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


    if (!fs.existsSync(generatedDirPAth))
        fs.mkdirSync(generatedDirPAth, {recursive: true});

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
            let sanitizedName = data.Name.replace('_png', '.png');

            if (!sanitizedName.endsWith('.png')) {
                sanitizedName = `${sanitizedName}.png`;
            }

            if (find?.displayName === '????') {
                console.log(find);
                find.displayName = sanitizedName;
            }

            const imageMetaData = {
                fileName: find?.displayName ? find.displayName + '.png' : sanitizedName,
                width: data.Properties.BakedSourceDimension.X,
                height: data.Properties.BakedSourceDimension.Y,
                top: data.Properties.BakedSourceUV?.Y ?? 0,
                left: data.Properties.BakedSourceUV?.X ?? 0,
                sourceImage: data.Properties.BakedSourceTexture.ObjectName.split(' ')[1],
            };

            const image = sharp(path.join(__dirname, 'assets', 'images', imageMetaData.sourceImage + '.png'));


            image.extract(imageMetaData).png().toFile(path.join(generatedDirPAth, imageMetaData.fileName)).catch((err: any) => {
                console.log(imageMetaData, find, data);
                console.log(err);
            });


        });


    });
}


generateJson('items.json', [...itemDbMap.values()]);
generateJson('crafting-recipes.json', [...craftingRecipeDbMap.values()]);

