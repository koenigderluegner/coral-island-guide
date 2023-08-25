import { convertToIconName, createPathIfNotExists, generateJson, getParsedArgs } from './util/functions';
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
import { LabOpeningHoursGenerator } from "./app/opening-hours-generators/lab-opening-hours.generator";
import {
    GeneralStoreOpeningHoursGenerator
} from "./app/opening-hours-generators/general-store-opening-hours.generator";
import { CarpenterOpeningHoursGenerator } from "./app/opening-hours-generators/carpenter-opening-hours.generator";
import { ItemUpgradeDataGenerator } from "./app/item-upgrade-data.generator";
import { Logger } from "./util/logger.class";
import chalk from "chalk";

console.log('CURRENT ENVIRONMENT SET TO ' + chalk.bold(environment.isBeta ? 'BETA' : 'LIVE') + '\n');

const parsedArgs = getParsedArgs()

const readable = !parsedArgs['prepare'] && true;
const skipIfExists = !parsedArgs['prepare'] && true;

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

let generators: Record<string, { generate: () => Map<string, any> }> = {}

let betaGenerators: Record<string, { generate: () => Map<string, any> }> = {}
let liveGenerators: Record<string, { generate: () => Map<string, any> }> = {}
try {

    if (environment.isBeta) {
        betaGenerators = {
            'blacksmith-opening-hours': new BlacksmithOpeningHoursGenerator(),
            'blacksmith-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/AlphaV1/DT_BlacksmithShop_AlphaV1.json'),
            'blacksmith-shop-process-items': new ItemProcessShopGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_NodeCofferProcessShopData.json'),
            'blacksmith-item-upgrade': new ItemUpgradeDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_BlacksmithToolsUpgrades_Alpha.json'),

            'lab-opening-hours': new LabOpeningHoursGenerator(),
            'lab-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_LabShop.json'),
            'lab-shop-process-items': new ItemProcessShopGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_FossilProcessShopData.json'),

            'general-store-opening-hours': new GeneralStoreOpeningHoursGenerator(),
            'general-store-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/AlphaV1/DT_SamShopItems_AlphaV1.json'),

            'carpenter-opening-hours': new CarpenterOpeningHoursGenerator(),
            'carpenter-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/AlphaV1/DT_Carpenter_AlphaV1.json'),
            'carpenter-item-upgrade': new ItemUpgradeDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_CarpenterBuldingUpgrades.json'),


            'merfolk-general-store-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_ShopMerfolkGeneralStore.json'),
            'merfolk-oracle-tail-store-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_ShopMerfolkOracleTailStore.json'),

        }
    } else {
        liveGenerators = {}
    }


    generators = {
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

        ...betaGenerators,
        ...liveGenerators,

        'tag-based-items': {generate: () => tagBasedItemsDbMap},
        'crafting-unlocks-by-mastery': {generate: () => craftingRecipeUnlockedByMasteryDbMap},
        'cooking-unlocks-by-mastery': {generate: () => cookingRecipeUnlockedByMasteryDbMap},
        'cooking-recipes': {generate: () => cookingDbMap},

        // last so applied changed will be written as well
        items: {generate: () => itemDbMap},
    };
} catch (e) {
    // @ts-ignore
    Logger.error('Generators couldn\'t be executed', e.message)
}

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

function printProgress(progress: number) {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    const percentage = progress.toFixed(2).padStart(3, '0') + '%';
    process.stdout.write(chalk.blue('PROGRESS:'.padEnd(Logger.PAD_SIZE)) + ' ' + percentage);
    if (progress === 100) console.log()
}

async function createImages(fileBasename: string, skipIfExists = true) {
    const data: Frame = JSON.parse(fs.readFileSync(path.join(texturesPath, fileBasename), {
        encoding: 'utf8',
        flag: 'r'
    })).filter((a: Frame) => a.Type === 'PaperSprite')[0];

    if (!data) return;


    const fileName = convertToIconName(data.Name).replace('.png', '');
    const pngPath = path.join(itemIconPath, fileName + '.png');
    const webpPath = path.join(itemIconPath, fileName + '.webp');

    const pngTargetExists = fs.existsSync(pngPath);
    const webpTargetExists = fs.existsSync(webpPath);
    if (skipIfExists && pngTargetExists && webpTargetExists) return;

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
            if (!pngTargetExists || !skipIfExists)
                await sourceImage.png().toFile(path.join(itemIconPath, imageMetaData.fileName + '.png'));
            if (!webpTargetExists || !skipIfExists)
                await sourceImage.webp().toFile(path.join(itemIconPath, imageMetaData.fileName + '.webp'));
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
        Logger.log(`checking ${filesWithJs.length} frames`);
        let counter = 0;
        for (const fileBasename of filesWithJs) {


            await createImages(fileBasename, skipIfExists);


            counter++;
            printProgress((counter / filesWithJs.length) * 100);

        }
        Logger.success('image extraction done');

    });
}

extractImages();

Object.keys(generators).forEach(generatorName => {
        try {
            const generatedMap = generators[generatorName].generate();
            generateJson(`${generatorName}.json`, [...generatedMap.values()], readable);
        } catch (e) {
            const error = e as Error;
            console.log('hehe', error.message)

        }

    }
);
