import { convertToIconName, createPathIfNotExists, generateJson } from './util/functions';
import { ItemDbGenerator } from './app/item-db.generator';
import { CraftingRecipeDbGenerator } from './app/crafting-recipe-db.generator';
import glob from 'glob';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { BugsAndInsectsDbGenerator } from './app/bugs-and-insects-db.generator';
import { OceanCritterDbGenerator } from './app/ocean-critter-db.generator';
import { FishDbGenerator } from './app/fish-db.generator';
import { JournalOrderDbGenerator } from './app/journal-order-db.generator';
import { CropsDbGenerator } from './app/crops-db.generator';
import { TagBasedItemGenericDbGenerator } from './app/tag-based-item-generic-db.generator';
import { ItemProcessorDbGenerator } from './app/item-processor-db.generator';
import { GiftPreferencesDbGenerator } from './app/gift-preferences-db.generator';
import { NPCDbGenerator } from './app/npc-db.generator';
import { CraftingRecipeUnlockedByMasteryDbGenerator } from "./app/crafting-recipe-unlocked-by-mastery-db.generator";
import { config } from "./config";

const itemIconPath = config.itemIconPath
const texturePath = config.texturePath;

const itemDbGenerator = new ItemDbGenerator();
const itemDbMap = itemDbGenerator.generate();

const npcDbGenerator = new NPCDbGenerator(itemDbMap);
const npcDbMap = npcDbGenerator.generate();

const craftingRecipeUnlockedByMasteryDbGenerator = new CraftingRecipeUnlockedByMasteryDbGenerator(itemDbMap);
const craftingRecipeUnlockedByMasteryDbMap = craftingRecipeUnlockedByMasteryDbGenerator.generate();

const generators: Record<string, { generate: () => Map<string, any> }> = {
    'crafting-recipes': new CraftingRecipeDbGenerator(itemDbMap, craftingRecipeUnlockedByMasteryDbMap),
    'bugs-and-insects': new BugsAndInsectsDbGenerator(itemDbMap),
    'ocean-critters': new OceanCritterDbGenerator(itemDbMap),
    'fish': new FishDbGenerator(itemDbMap),
    'crops': new CropsDbGenerator(itemDbMap),
    'tag-based-items': new TagBasedItemGenericDbGenerator(),
    'item-processing': new ItemProcessorDbGenerator(itemDbMap),

    'journal-fish': new JournalOrderDbGenerator('Caught/DT_JournalFish.json'),
    'journal-insects': new JournalOrderDbGenerator('Caught/DT_JournalInsects.json'),
    'journal-sea-critters': new JournalOrderDbGenerator('Caught/DT_JournalSeaCritters.json'),

    'journal-artifacts': new JournalOrderDbGenerator('Found/DT_JournalArtifact.json'),
    'journal-fossils': new JournalOrderDbGenerator('Found/DT_JournalFossils.json'),
    'journal-gems': new JournalOrderDbGenerator('Found/DT_JournalGems.json'),
    'journal-scavangable': new JournalOrderDbGenerator('Found/DT_JournalScavangable.json'),


    'journal-animal-products': new JournalOrderDbGenerator('Produce/DT_JournalAnimalProducts.json'),
    'journal-artisan-products': new JournalOrderDbGenerator('Produce/DT_JournalArtisanProducts.json'),
    'journal-crops': new JournalOrderDbGenerator('Produce/DT_JournalCrops.json'),

    'gift-preferences': new GiftPreferencesDbGenerator(itemDbMap, npcDbMap),
    'npcs': new NPCDbGenerator(itemDbMap),

    'crafting-unlocks-by-mastery': {generate: () => craftingRecipeUnlockedByMasteryDbMap},

    // last so applied changed will be written as well
    items: {generate: () => itemDbMap},
};


// manually added generic seed icon from PC Content PC Core Data TemporaryIcon


interface Frame {
    "Type": string;
    "Name": string;
    "Properties": {
        "BakedSourceUV": {
            "X": number
            "Y": number
        },
        "BakedSourceDimension": {
            "X": number
            "Y": number
        },
        "BakedSourceTexture": {
            "ObjectName": string
            "ObjectPath": string
        },
    };
}

async function createImages(fileBasename: string, skipIfExists = true) {
    const data: Frame = JSON.parse(fs.readFileSync(path.join(texturePath, fileBasename), {
        encoding: 'utf8',
        flag: 'r'
    })).filter((a: Frame) => a.Type === 'PaperSprite')[0];
    const fileName = convertToIconName(data.Name);
    if (skipIfExists && fs.existsSync(path.join(itemIconPath, fileName))) return;

    const imageMetaData = {
        fileName,
        width: data.Properties.BakedSourceDimension.X,
        height: data.Properties.BakedSourceDimension.Y,
        top: data.Properties.BakedSourceUV?.Y ?? 0,
        left: data.Properties.BakedSourceUV?.X ?? 0,
        sourceImage: data.Properties.BakedSourceTexture.ObjectName.split(' ')[1],
    };

    const image = sharp(path.join(__dirname, 'assets', 'images', imageMetaData.sourceImage + '.png'));

    if (imageMetaData.fileName) {
        try {
            await image.extract(imageMetaData).png().toFile(path.join(itemIconPath, imageMetaData.fileName));
        } catch (e) {
            console.log(e);
        }


    }
}

async function extractImages() {


    createPathIfNotExists(itemIconPath);


    glob('*', {cwd: texturePath}, async (error: Error | null, filesWithJs: string[]) => {
        if (error) {
            console.log(error);
        }
        console.log(`extracting ${filesWithJs.length} images`);
        let counter = 0;
        for (const fileBasename of filesWithJs) {

            await createImages(fileBasename, true);


            counter++;
            if (counter % 100 === 0) {
                console.log(`processed ${counter} images...`);
            }

        }

        console.log('extracting done');

    });
}

extractImages();


Object.keys(generators).forEach(generatorName => {
        const generatedMap = generators[generatorName].generate();

        // if(generatorName === 'fish')
        //     printFish([...generatedMap.values()])

    generateJson(`${generatorName}.json`, [...generatedMap.values()], true);
    }
);
