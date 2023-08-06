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
import { CookingRecipeUnlockedByMasteryDbGenerator } from "./app/cooking-recipe-unlocked-by-mastery-db.generator";
import { CookingDbGenerator } from "./app/cooking-db.generator";
import { FruitTreeDbGenerator } from "./app/fruit-tree-db.generator";
import { FruitPlantDbGenerator } from "./app/fruit-plant-db.generator";
import { OfferingsDbGenerator } from "./app/offerings-db.generator";
import { ConsumablesDbGenerator } from "./app/consumables-db.generator";
import { environment } from "./environments/environment";
import { BlacksmithOpeningHoursGenerator } from "./app/opening-hours-generators/blacksmith-opening-hours.generator";
import { ShopItemDataGenerator } from "./app/shop-item-data.generator";
import { ItemProcessShopGenerator } from "./app/item-process-shop.generator";

console.log('CURRENT ENVIRONMENT SET TO ' + (environment.isBeta ? 'BETA' : 'LIVE'));


const itemIconPath = config.itemIconPath
const texturesPath = config.texturesPath;

const itemDbGenerator = new ItemDbGenerator();
const itemDbMap = itemDbGenerator.generate();

const npcDbGenerator = new NPCDbGenerator(itemDbMap);
const npcDbMap = npcDbGenerator.generate();

const craftingRecipeUnlockedByMasteryDbGenerator = new CraftingRecipeUnlockedByMasteryDbGenerator(itemDbMap);
const craftingRecipeUnlockedByMasteryDbMap = craftingRecipeUnlockedByMasteryDbGenerator.generate();

const cookingRecipeUnlockedByMasteryDbGenerator = new CookingRecipeUnlockedByMasteryDbGenerator(itemDbMap);
const cookingRecipeUnlockedByMasteryDbMap = cookingRecipeUnlockedByMasteryDbGenerator.generate();

const tagBasedItemsDbGenerator = new TagBasedItemGenericDbGenerator();
const tagBasedItemsDbMap = tagBasedItemsDbGenerator.generate();

const cookingDbGenerator = new CookingDbGenerator(itemDbMap, cookingRecipeUnlockedByMasteryDbMap, tagBasedItemsDbMap);
const cookingDbMap = cookingDbGenerator.generate();

const generators: Record<string, { generate: () => Map<string, any> }> = {
    'crafting-recipes': new CraftingRecipeDbGenerator(itemDbMap, craftingRecipeUnlockedByMasteryDbMap),
    'bugs-and-insects': new BugsAndInsectsDbGenerator(itemDbMap),
    'ocean-critters': new OceanCritterDbGenerator(itemDbMap),
    'fish': new FishDbGenerator(itemDbMap),
    'crops': new CropsDbGenerator(itemDbMap),
    'fruit-trees': new FruitTreeDbGenerator(itemDbMap),
    'fruit-plants': new FruitPlantDbGenerator(itemDbMap),
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

    'offerings': new OfferingsDbGenerator(itemDbMap, cookingDbMap),

    'gift-preferences': new GiftPreferencesDbGenerator(itemDbMap, npcDbMap),
    'npcs': new NPCDbGenerator(itemDbMap),

    'consumables': new ConsumablesDbGenerator(),

    'blacksmith-opening-hours': new BlacksmithOpeningHoursGenerator(),
    'blacksmith-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/AlphaV1/DT_BlacksmithShop_AlphaV1.json'),
    'blacksmith-shop-process-items': new ItemProcessShopGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_NodeCofferProcessShopData.json'),

    'tag-based-items': {generate: () => tagBasedItemsDbMap},
    'crafting-unlocks-by-mastery': {generate: () => craftingRecipeUnlockedByMasteryDbMap},
    'cooking-unlocks-by-mastery': {generate: () => cookingRecipeUnlockedByMasteryDbMap},
    'cooking-recipes': {generate: () => cookingDbMap},

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
    const data: Frame = JSON.parse(fs.readFileSync(path.join(texturesPath, fileBasename), {
        encoding: 'utf8',
        flag: 'r'
    })).filter((a: Frame) => a.Type === 'PaperSprite')[0];

    if (!data) return;


    const fileName = convertToIconName(data.Name);
    if (skipIfExists && fs.existsSync(path.join(itemIconPath, fileName))) return;

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
            await image.extract(imageMetaData).png().toFile(path.join(itemIconPath, imageMetaData.fileName));
        } catch (e) {
            console.log(e);
        }


    }
}

async function extractImages() {


    createPathIfNotExists(itemIconPath);


    glob('**/*.json', {cwd: texturesPath,}, async (error: Error | null, filesWithJs: string[]) => {
        if (error) {
            console.log(error);
        }
        console.log(`checking ${filesWithJs.length} frames`);
        let counter = 0;
        for (const fileBasename of filesWithJs) {

            await createImages(fileBasename, true);


            counter++;
            if (counter % 500 === 0) {
                console.log(`processed ${counter} images...`);
            }

        }

        console.log('extracting done');

    });
}

extractImages();


Object.keys(generators).forEach(generatorName => {
        const generatedMap = generators[generatorName].generate();

        // if(generatorName === 'consumables')
        // {
        //     // @ts-ignore
        //     console.log(generators['consumables'].buff);
        //     // @ts-ignore
        //     console.log(generators['consumables'].level);
        //     // @ts-ignore
        //     console.log(generators['consumables'].duration);
        //     // @ts-ignore
        //     console.log(generators['consumables'].itemType);
        // }

        generateJson(`${generatorName}.json`, [...generatedMap.values()], true);
    }
);
