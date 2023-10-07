import { generateJson, getParsedArgs } from './util/functions';
import { ItemDbGenerator } from './app/item-db.generator';
import { environment } from "./environments/environment";
import chalk from "chalk";
import { CookingDbGenerator } from "./app/cooking-db.generator";
import { config } from "./config";
import { ItemIconsImageProcessor } from "./app/image-processors/item-icons.image-processor";
import { NPCDbGenerator } from "./app/npc-db.generator";
import { CraftingRecipeUnlockedByMasteryDbGenerator } from "./app/crafting-recipe-unlocked-by-mastery-db.generator";
import { CookingRecipeUnlockedByMasteryDbGenerator } from "./app/cooking-recipe-unlocked-by-mastery-db.generator";
import { TagBasedItemGenericDbGenerator } from "./app/tag-based-item-generic-db.generator";
import { CraftingRecipeDbGenerator } from "./app/crafting-recipe-db.generator";
import { BugsAndInsectsDbGenerator } from "./app/bugs-and-insects-db.generator";
import { OceanCritterDbGenerator } from "./app/ocean-critter-db.generator";
import { FishDbGenerator } from "./app/fish-db.generator";
import { CropsDbGenerator } from "./app/crops-db.generator";
import { FruitTreeDbGenerator } from "./app/fruit-tree-db.generator";
import { FruitPlantDbGenerator } from "./app/fruit-plant-db.generator";
import { ItemProcessorDbGenerator } from "./app/item-processor-db.generator";
import { JournalOrderDbGenerator } from "./app/journal-order-db.generator";
import { OfferingsDbGenerator } from "./app/offerings-db.generator";
import { GiftPreferencesDbGenerator } from "./app/gift-preferences-db.generator";
import { ConsumablesDbGenerator } from "./app/consumables-db.generator";
import { BlacksmithOpeningHoursGenerator } from "./app/opening-hours-generators/blacksmith-opening-hours.generator";
import { ShopItemDataGenerator } from "./app/shop-item-data.generator";
import { ItemProcessShopGenerator } from "./app/item-process-shop.generator";
import { ItemUpgradeDataGenerator } from "./app/item-upgrade-data.generator";
import { LabOpeningHoursGenerator } from "./app/opening-hours-generators/lab-opening-hours.generator";
import { GeneralStoreOpeningHoursGenerator } from "./app/opening-hours-generators/general-store-opening-hours.generator";
import { RanchOpeningHoursGenerator } from "./app/opening-hours-generators/ranch-opening-hours.generator";
import { BeachShackOpeningHoursGenerator } from "./app/opening-hours-generators/beach-shack-opening-hours.generator";
import { CarpenterOpeningHoursGenerator } from "./app/opening-hours-generators/carpenter-opening-hours.generator";
import { PetShopAdoptionsGenerator } from "./app/pet-shop-adoptions.generator";
import { Logger } from "./util/logger.class";
import { NpcPortraitsImageProcessor } from "./app/image-processors/npc-portraits.image-processor";
import { AchievementGenerator } from "./app/achievement.generator";
import { DaFilesParser } from "./app/da-files-parser";
import { SpecialItemDbGenerator } from "./app/special-item-db.generator";
import { MeritExchangeShopDataGenerator } from "./app/merit-exchange-shop-data.generator";
import { LocationInfoGenerator } from "./app/location-info.generator";
import { HeartEventTriggerDataGenerator } from "./app/heart-event-trigger-data.generator";

console.log('CURRENT ENVIRONMENT SET TO ' + chalk.bold(environment.isBeta ? 'BETA' : 'LIVE') + '\n');

const parsedArgs = getParsedArgs()


const itemIconPath = config.itemIconPath
const itemIconsTexturesPath = config.texturesPath;
const skipIfExists = !parsedArgs['prepare'] && true;
const itemIconsImageProcessor: ItemIconsImageProcessor = new ItemIconsImageProcessor(itemIconsTexturesPath, itemIconPath, skipIfExists);


const readable = !parsedArgs['prepare'] && true;

const itemDbGenerator = new ItemDbGenerator();
const itemDbMap = itemDbGenerator.generate();

DaFilesParser.ItemMap = itemDbMap;

const npcDbGenerator = new NPCDbGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/AI/DT_NPCs.json');
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
        betaGenerators = {}
    } else {
        const achievementGenerator = new AchievementGenerator();
        const achievementMap = achievementGenerator.generate();

        DaFilesParser.AchievementMap = achievementMap;

        const specialItemDbGenerator = new SpecialItemDbGenerator();
        const specialItemDbMap = specialItemDbGenerator.generate();

        DaFilesParser.SpecialItemMap = specialItemDbMap;

        const locationInfoGenerator = new LocationInfoGenerator();
        const locationInfoMap = locationInfoGenerator.generate();


        liveGenerators = {

            'concerned-monkey-shop-items': {
                generate: () => new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_ShopConcernedMonke.json').generate({
                    daFiles: [
                        'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DA_ConcernedMonkeyBuyEffect.json',
                        'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DA_ShopConcernedAdvanceRequirement.json'
                    ]
                })
            },

            'merit-exchange-shop-items': {
                generate: () => new MeritExchangeShopDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_MeritShop.json').generate({
                    daFiles: [
                        'ProjectCoral/Content/ProjectCoral/Data/Items/DA_ItemConsumableCustomEffectsConfig.json',
                    ]
                })
            },

            'heart-event-trigger': {
                generate: () => new HeartEventTriggerDataGenerator(locationInfoMap).generate({
                    daFiles: [
                        'ProjectCoral/Content/ProjectCoral/Data/HeartEventCutscene/DA_HeartEventCutsceneAdvanceRequirement.json',
                        'ProjectCoral/Content/ProjectCoral/Data/HeartEventCutscene/DA_HeartEventCutsceneEffects.json',
                    ]
                })
            },

            'achievements': {generate: () => achievementMap},
            'special-items': {generate: () => specialItemDbMap},
        }
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

        'consumables': new ConsumablesDbGenerator(),


        'blacksmith-opening-hours': new BlacksmithOpeningHoursGenerator(),
        'blacksmith-shop-items': {
            generate: () => new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/AlphaV1/DT_BlacksmithShop_AlphaV1.json').generate({
                daFiles: ['ProjectCoral/Content/ProjectCoral/Core/Data/Shops/AlphaV1/DA_BlacksmithItemRequirement.json']
            })
        },
        'blacksmith-shop-process-items': new ItemProcessShopGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_NodeCofferProcessShopData.json'),
        'blacksmith-item-upgrade': new ItemUpgradeDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_BlacksmithToolsUpgrades_Alpha.json'),

        'lab-opening-hours': new LabOpeningHoursGenerator(),
        'lab-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_LabShop.json'),
        'lab-shop-process-items': new ItemProcessShopGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_FossilProcessShopData.json'),
        'lab-item-upgrade': new ItemUpgradeDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_LabUpgrade.json'),

        'general-store-opening-hours': new GeneralStoreOpeningHoursGenerator(),
        'general-store-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/AlphaV1/DT_SamShopItems_AlphaV1.json'),


        'ranch-opening-hours': new RanchOpeningHoursGenerator(),
        'ranch-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_RanchShop.json'),

        'beach-shack-opening-hours': new BeachShackOpeningHoursGenerator(),
        'beach-shack-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_BeachSackShopItems.json'),


        'pet-shop-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_ItemPetShop.json'),

        'carpenter-opening-hours': new CarpenterOpeningHoursGenerator(),
        'carpenter-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/AlphaV1/DT_Carpenter_AlphaV1.json'),
        'carpenter-item-upgrade': new ItemUpgradeDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_CarpenterBuldingUpgrades.json'),


        'merfolk-general-store-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_ShopMerfolkGeneralStore.json'),
        'merfolk-oracle-tail-store-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_ShopMerfolkOracleTailStore.json'),

        'pet-shop-adoptions': new PetShopAdoptionsGenerator(npcDbMap),

        ...betaGenerators,
        ...liveGenerators,

        'npcs': {generate: () => npcDbMap},
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

itemIconsImageProcessor.process();
new NpcPortraitsImageProcessor(config.characterPortraitsPath, config.portaitPath, config.headPortaitPath).process()
