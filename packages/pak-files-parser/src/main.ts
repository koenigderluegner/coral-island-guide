import { generateJson, getParsedArgs, readAsset } from './util/functions';
import { ItemDbGenerator } from './app/generators/item-db.generator';
import { environment } from "./environments/environment";
import chalk from "chalk";
import { CookingDbGenerator } from "./app/generators/cooking-db.generator";
import { config } from "./config";
import { ItemIconsImageProcessor } from "./app/image-processors/item-icons.image-processor";
import { NPCDbGenerator } from "./app/generators/npc-db.generator";
import { CraftingRecipeUnlockedByMasteryDbGenerator } from "./app/generators/crafting-recipe-unlocked-by-mastery-db.generator";
import { CookingRecipeUnlockedByMasteryDbGenerator } from "./app/generators/cooking-recipe-unlocked-by-mastery-db.generator";
import { TagBasedItemGenericDbGenerator } from "./app/generators/tag-based-item-generic-db.generator";
import { CraftingRecipeDbGenerator } from "./app/generators/crafting-recipe-db.generator";
import { BugsAndInsectsDbGenerator } from "./app/generators/bugs-and-insects-db.generator";
import { OceanCritterDbGenerator } from "./app/generators/ocean-critter-db.generator";
import { FishDbGenerator } from "./app/generators/fish-db.generator";
import { CropsDbGenerator } from "./app/generators/crops-db.generator";
import { FruitTreeDbGenerator } from "./app/generators/fruit-tree-db.generator";
import { FruitPlantDbGenerator } from "./app/generators/fruit-plant-db.generator";
import { ItemProcessorDbGenerator } from "./app/generators/item-processor-db.generator";
import { JournalOrderDbGenerator } from "./app/generators/journal-order-db.generator";
import { OfferingsDbGenerator } from "./app/generators/offerings-db.generator";
import { GiftPreferencesDbGenerator } from "./app/generators/gift-preferences-db.generator";
import { ConsumablesDbGenerator } from "./app/generators/consumables-db.generator";
import { BlacksmithOpeningHoursGenerator } from "./app/opening-hours-generators/blacksmith-opening-hours.generator";
import { ShopItemDataGenerator } from "./app/generators/shop-item-data.generator";
import { ItemProcessShopGenerator } from "./app/generators/item-process-shop.generator";
import { ItemUpgradeDataGenerator } from "./app/generators/item-upgrade-data.generator";
import { LabOpeningHoursGenerator } from "./app/opening-hours-generators/lab-opening-hours.generator";
import { GeneralStoreOpeningHoursGenerator } from "./app/opening-hours-generators/general-store-opening-hours.generator";
import { RanchOpeningHoursGenerator } from "./app/opening-hours-generators/ranch-opening-hours.generator";
import { BeachShackOpeningHoursGenerator } from "./app/opening-hours-generators/beach-shack-opening-hours.generator";
import { CarpenterOpeningHoursGenerator } from "./app/opening-hours-generators/carpenter-opening-hours.generator";
import { PetShopAdoptionsGenerator } from "./app/generators/pet-shop-adoptions.generator";
import { Logger } from "./util/logger.class";
import { NpcPortraitsImageProcessor } from "./app/image-processors/npc-portraits.image-processor";
import { AchievementGenerator } from "./app/generators/achievement.generator";
import { DaFilesParser } from "./app/da-files-parser";
import { SpecialItemDbGenerator } from "./app/generators/special-item-db.generator";
import { MeritExchangeShopDataGenerator } from "./app/generators/merit-exchange-shop-data.generator";
import { LocationInfoGenerator } from "./app/generators/location-info.generator";
import { HeartEventTriggerDataGenerator } from "./app/generators/heart-event-trigger-data.generator";
import { HeartEventsDbGenerator } from "./app/generators/heart-events-db.generator";
import { MuseumChecklistGenerator } from "./app/generators/museum-checklist.generator";
import { ItemProcessorMapGenerator } from "./app/generators/item-processor-map.generator";
import { CookingRecipesChecklistGenerator } from "./app/generators/cooking-recipes-checklist.generator";
import { CalendarGenerator } from "./app/generators/calendar.generator";
import { MailDataGenerator } from "./app/generators/mail-data.generator";
import { TornPagesGenerator } from "./app/generators/torn-pages.generator";
import { BestiaryGenerator } from "./app/generators/bestiary.generator";
import { CookingUtensilMapGenerator } from "./app/generators/cooking-utensil-map.generator";
import { StringTable } from "./util/string-table.class";
import {
    AnimalShopData,
    AvailableLanguages,
    CookingRecipe,
    CraftingRecipe,
    DatabaseItem,
    FestivalDisplayNames,
    FestivalEventIds,
    FestivalNames,
    Item,
    ItemProcessing,
    ItemProcessShopData,
    ItemUpgradeData,
    MinimalNPC,
    Quality,
    ShopDisplayNames,
    ShopNames
} from "@ci/data-types";
import { AnimalMoodSizeGenerator } from "./app/generators/animal-mood-size.generator";
import { AnimalDataGenerator } from "./app/generators/animal-data.generator";
import { AnimalShopDataGenerator } from "./app/generators/animal-shop-data.generator";
import { FestivalDbGenerator } from "./app/generators/festival-db.generator";
import { FestivalShopItemDataGenerator } from "./app/generators/festival-shop-item-data.generator";
import { FestivalDataGenerator } from "./app/generators/festival-data.generator";
import path from "path";
import { flatObjectMap, getQuality, nonNullable, omitFields, removeQualityFlag } from "@ci/util";
import { preferencesMap } from "../../guide/src/app/shared/constants/preference-map.const";
import fs from "fs";
import { Datatable } from "./interfaces/datatable.interface";
import { DashboardFilesCreation } from "./app/dashboard-files-creation.function";
import { BaseOpeningHoursGenerator } from "./app/opening-hours-generators/base-opening-hours.generator";
import { TreasureHuntGenerator } from "./app/generators/treasure-hunt.generator";
import { SimpleCopyImageProcessor } from "./app/image-processors/simple-copy.image-processor";


console.log('CURRENT ENVIRONMENT SET TO ' + chalk.bold(environment.isBeta ? 'BETA' : 'LIVE') + '\n');
const versionFile = path.join(config.sourceContentPath, 'Version', 'Config.json');
if (fs.existsSync(versionFile)) {
    const version = fs.readFileSync(versionFile, {encoding: 'utf8', flag: 'r'}).trim();
    fs.writeFileSync(path.join(config.assetsPath, 'version.json'), JSON.stringify({version}));
}
const parsedArgs = getParsedArgs()


const itemIconPath = config.itemIconPath
const itemIconsTexturesPath = config.texturesPath;
const skipIfExists = !parsedArgs['prepare'] && true;
const itemIconsImageProcessor: ItemIconsImageProcessor = new ItemIconsImageProcessor(itemIconsTexturesPath, itemIconPath, skipIfExists);


const readable = !parsedArgs['prepare'] && true;

const additionalNPCOutfitsMappings = [
    {npcKey: 'Sawee', outfitKey: 'Sawee', appearanceName: 'Mystical Pet'},
    {npcKey: 'Sawee', outfitKey: 'Dragon', appearanceName: 'Mystical Pet'},
    {npcKey: 'Sawee', outfitKey: 'Lembu', appearanceName: 'Mystical Pet'},
];

if (environment.isBeta) {
    additionalNPCOutfitsMappings.unshift(...[
        {npcKey: 'Semeru', outfitKey: 'SemeruHuman', appearanceName: 'Human Form'},
        {npcKey: 'Denali', outfitKey: 'DenaliHuman', appearanceName: 'Human Form'},
        {npcKey: 'PrincessMiranjani', outfitKey: 'MiranjaniHuman', appearanceName: 'Human Form'},
        {npcKey: 'Raina', outfitKey: 'RainaRecCenter', appearanceName: 'Rec Center'},
    ])
}

AvailableLanguages.forEach(lang => {
    Logger.info(`Generators for "${lang}" starting...`);
    StringTable.defaultLang = lang;

    const itemDbGenerator = new ItemDbGenerator();
    const itemDbMap = itemDbGenerator.generate();

    DaFilesParser.ItemMap = itemDbMap;

    let calendarDbMap;


    const calendarDbGenerator = new CalendarGenerator();
    calendarDbMap = calendarDbGenerator.generate();


    const npcDbGenerator = new NPCDbGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/AI/DT_NPCs.json', calendarDbMap, additionalNPCOutfitsMappings);
    const npcDbMap = npcDbGenerator.generate();

    const craftingRecipeUnlockedByMasteryDbGenerator = new CraftingRecipeUnlockedByMasteryDbGenerator(itemDbMap);
    const craftingRecipeUnlockedByMasteryDbMap = craftingRecipeUnlockedByMasteryDbGenerator.generate();

    const cookingRecipeUnlockedByMasteryDbGenerator = new CookingRecipeUnlockedByMasteryDbGenerator(itemDbMap);
    const cookingRecipeUnlockedByMasteryDbMap = cookingRecipeUnlockedByMasteryDbGenerator.generate();

    const tagBasedItemsDbGenerator = new TagBasedItemGenericDbGenerator(itemDbMap);
    const tagBasedItemsDbMap = tagBasedItemsDbGenerator.generate();

    const cookingDbGenerator = new CookingDbGenerator(itemDbMap, cookingRecipeUnlockedByMasteryDbMap, tagBasedItemsDbMap);
    const cookingDbMap = cookingDbGenerator.generate();

    DaFilesParser.CookingMap = cookingDbMap;


    let betaGenerators: Record<string, { generate: () => Map<string, any> }> = {}
    let liveGenerators: Record<string, { generate: () => Map<string, any> }> = {}
    try {

        if (environment.isBeta) {
            betaGenerators = {

                'taco-truck-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_TacoTruck.json'),

                'sales-cart-stall-indoor-shop-items': {
                    generate: () => new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_ShopUnderWaterFurnitureIndoor.json').generate({
                        daFiles: [
                            'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/Furniture/DA_UnderWaterFurnitureShopBuyEffect.json',

                        ]
                    })
                },
                'sales-cart-stall-outdoor-shop-items': {
                    generate: () => new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_ShopUnderWaterFurnitureOutdoor.json').generate({
                        daFiles: [
                            'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/Furniture/DA_UnderWaterFurnitureShopBuyEffect.json',

                        ]
                    })
                },
                'sales-cart-stall-opening-hours': new BaseOpeningHoursGenerator({'Building': 'ProjectCoral/Content/ProjectCoral/Data/OpeningHours/UnderWaterFurnitureHours.json'}),

                'tidal-threads-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/TidalThreads/DT_TidalThreadsClothShop.json'),
                'tidal-threads-opening-hours': new BaseOpeningHoursGenerator({'Building': 'ProjectCoral/Content/ProjectCoral/Data/OpeningHours/TidalThreadsHours.json'}),


                'underwater-ranch-opening-hours': new BaseOpeningHoursGenerator({'Building': 'ProjectCoral/Content/ProjectCoral/Data/OpeningHours/UnderWaterRanchHours.json'}),
                'underwater-ranch-animal-shop-data': {
                    generate: () => new AnimalShopDataGenerator(`ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_AnimalUnderwaterShop.json`).generate({
                        daFiles: [
                            'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DA_AnimalUnderwaterShopAdvanceRequirement.json',

                        ]
                    })
                },
                'treasure-hunt-maps': new TreasureHuntGenerator(itemDbMap),
                'journal-ocean-products': new JournalOrderDbGenerator('Produce/DT_JournalOcean.json'),
            }
        } else {


            liveGenerators = {}
        }

        const festivalDbMap = new FestivalDbGenerator().generate();
        const festivalDbValues = [...festivalDbMap.values()];

        const achievementMap = new AchievementGenerator().generate();

        DaFilesParser.AchievementMap = achievementMap;

        const specialItemDbMap = new SpecialItemDbGenerator().generate();

        DaFilesParser.SpecialItemMap = specialItemDbMap;

        const locationInfoMap = new LocationInfoGenerator().generate();

        const mailDataMap = new MailDataGenerator().generate({
            daFiles: [
                'ProjectCoral/Content/ProjectCoral/Data/Mail/DA_MailEffectsConfig.json'
            ]
        });


        DaFilesParser.MailMap = mailDataMap;

        const heartEventTriggerDataMap = new HeartEventTriggerDataGenerator(locationInfoMap).generate({
            daFiles: [
                'ProjectCoral/Content/ProjectCoral/Data/HeartEventCutscene/DA_HeartEventCutsceneAdvanceRequirement.json',
                'ProjectCoral/Content/ProjectCoral/Data/HeartEventCutscene/DA_HeartEventCutsceneEffects.json',
            ]
        });


        const generators = {
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

            'offerings': new OfferingsDbGenerator(itemDbMap, cookingDbMap, tagBasedItemsDbMap),

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
            'ranch-animal-shop-data': {
                generate: () => new AnimalShopDataGenerator(`ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_AnimalShop.json`).generate({
                    daFiles: [
                        'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DA_AnimalShopAdvanceRequirement.json',

                    ]
                })
            },


            'furniture-store-indoor-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_ShopFurniture.json'),
            'furniture-store-outdoor-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_ShopFurnitureOutdoor.json'),
            'furniture-store-opening-hours': new BaseOpeningHoursGenerator({'Building': 'ProjectCoral/Content/ProjectCoral/Data/OpeningHours/FurnitureShop.json'}),


            'white-flamingo-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_ClothShop.json'),


            'coffee-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_RajCoffeeShop.json'),

            'beach-shack-opening-hours': new BeachShackOpeningHoursGenerator(),
            'beach-shack-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_BeachSackShopItems.json'),
            'beach-shack-item-upgrade': new ItemUpgradeDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_BeachShacksToolsUpgrades_Alpha.json'),


            'pet-shop-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_ItemPetShop.json'),

            'carpenter-opening-hours': new CarpenterOpeningHoursGenerator(),
            'carpenter-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/AlphaV1/DT_Carpenter_AlphaV1.json'),
            'carpenter-item-upgrade': new ItemUpgradeDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_CarpenterBuldingUpgrades.json'),


            'merfolk-general-store-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_ShopMerfolkGeneralStore.json'),
            'merfolk-oracle-tail-store-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_ShopMerfolkOracleTailStore.json'),

            'pet-shop-adoptions': new PetShopAdoptionsGenerator(npcDbMap),


            'bos-shop-items': {
                generate: () => new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_BOSShopItemsProductions.json').generate({
                    daFiles: ['ProjectCoral/Content/ProjectCoral/Core/Data/Shops/BandOfSmile/DA_BOSShopAdvanceRequirement.json']
                }),
            },
            'socket-and-pan-shop-items': {
                generate: () => new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/SocketAndPan/DT_ShopSockedAndPan.json').generate({
                    daFiles: [
                        'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/SocketAndPan/DA_ShopSocketAndPanRequirement.json',
                        'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/SocketAndPan/DA_ShopSocketAndPanEffect.json',

                    ]
                })
            },
            'bens-caravan-shop-items': {
                generate: () => new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_BenShopItems.json').generate({
                    daFiles: []
                })
            },
            'tavern-shop-items': {
                generate: () => new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_TavernShop.json').generate({
                    daFiles: []
                })
            },

            ...betaGenerators,
            ...liveGenerators,


            'animal-data': new AnimalDataGenerator(itemDbMap),
            'animal-mood-size': new AnimalMoodSizeGenerator(),
            'torn-pages': new TornPagesGenerator(),
            'bestiary': new BestiaryGenerator(itemDbMap),


            'winter-fair-festival-data': new FestivalDataGenerator(festivalDbValues.find(f => f.eventId === FestivalEventIds["winter-fair"])!, [
                {
                    title: 'Clothing Shop',
                    shop: new FestivalShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/Festival/DT_WinterFairClothingFestivalShop.json').generate()
                },
                {
                    title: 'Food Shop',
                    shop: new FestivalShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/Festival/DT_WinterFairFoodFestivalShop.json').generate()
                },
                {
                    title: 'Gift Shop',
                    shop: new FestivalShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/Festival/DT_WinterFairGiftFestivalShop.json').generate()
                },
            ]),

            'cherry-blossom-festival-data': new FestivalDataGenerator(festivalDbValues.find(f => f.eventId === FestivalEventIds["cherry-blossom"])!, [
                {
                    title: 'Booth',
                    shop: new FestivalShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/Festival/DT_CherryBlossomFestivalShop.json').generate()
                }
            ]),

            'tree-planting-festival-data': new FestivalDataGenerator(festivalDbValues.find(f => f.eventId === FestivalEventIds["tree-planting"])!, [
                {
                    title: 'Shop',
                    shop: new FestivalShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/Festival/DT_TreePlantingFestivalShop.json').generate()
                }
            ]),
            'animal-festival-data': new FestivalDataGenerator(festivalDbValues.find(f => f.eventId === FestivalEventIds["animal"])!, [
                {
                    title: 'Shop',
                    shop: new FestivalShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/Festival/DT_AnimalFestivalShop.json').generate()
                }
            ]),
            'beach-clean-up-festival-data': new FestivalDataGenerator(festivalDbValues.find(f => f.eventId === FestivalEventIds["beach-clean-up"])!, [
                {
                    title: 'Shop',
                    shop: new FestivalShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/Festival/DT_BeachCleanupFestivalShop.json').generate(
                        {
                            daFiles: [
                                'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DA_FestivalShopBuyEffect.json'
                            ]
                        }
                    )
                },
                {
                    title: 'Pufferfish Shop',
                    shop: new FestivalShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_BeachCleanupPufferfishShop.json').generate(
                        {
                            daFiles: [
                                'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DA_FestivalShopBuyEffect.json'
                            ]
                        }
                    )
                }
            ]),
            'harvest-festival-data': new FestivalDataGenerator(festivalDbValues.find(f => f.eventId === FestivalEventIds["harvest"])!, [
                {
                    title: 'Shop',
                    shop: new FestivalShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/Festival/DT_HarvestFestivalShop.json').generate(
                        {
                            daFiles: [
                                'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DA_FestivalShopBuyEffect.json'
                            ]
                        }
                    )
                }
            ]),
            'spooky-festival-data': new FestivalDataGenerator(festivalDbValues.find(f => f.eventId === FestivalEventIds["spooky"])!, [
                {
                    title: 'Shop',
                    shop: new FestivalShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/Festival/DT_SpookyDayFestivalShop.json').generate(
                        {
                            daFiles: [
                                'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DA_FestivalShopBuyEffect.json'
                            ]
                        }
                    )
                }
            ]),
            'new-year-eve-festival-data': new FestivalDataGenerator(festivalDbValues.find(f => f.eventId === FestivalEventIds["new-year-eve"])!, [
                {
                    title: 'Shop',
                    shop: new FestivalShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/Festival/DT_NewYearFestivalShop.json').generate(
                        {
                            daFiles: [
                                'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DA_FestivalShopBuyEffect.json'
                            ]
                        }
                    )
                }
            ]),

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

            'heart-events': new HeartEventsDbGenerator(heartEventTriggerDataMap),

            'museum-checklist': new MuseumChecklistGenerator(itemDbMap),
            'cooking-recipes-checklist': new CookingRecipesChecklistGenerator(itemDbMap, cookingDbMap),

            'processor-mapping': new ItemProcessorMapGenerator(itemDbMap),
            'cooking-utensil-mapping': new CookingUtensilMapGenerator(itemDbMap),

            'achievements': {generate: () => achievementMap},
            'special-items': {generate: () => specialItemDbMap},
            'mail-data': {generate: () => mailDataMap},

            'npcs': {generate: () => npcDbMap},
            'tag-based-items': {generate: () => tagBasedItemsDbMap},
            'crafting-unlocks-by-mastery': {generate: () => craftingRecipeUnlockedByMasteryDbMap},
            'cooking-unlocks-by-mastery': {generate: () => cookingRecipeUnlockedByMasteryDbMap},
            'cooking-recipes': {generate: () => cookingDbMap},

            // last so applied changed will be written as well
            items: {generate: () => itemDbMap},
        } as const;


        // TODO clean up / extract
        type Generators = typeof generators;
        type GeneratorKey = keyof Generators;
        type GeneratedMapValue<K extends GeneratorKey> = ReturnType<Generators[K]['generate']> extends Map<string, infer R> ? R[] : never;
        type GeneratorValues = { [k in GeneratorKey]: GeneratedMapValue<k> }

        const generatorResults: Partial<GeneratorValues> = {};

        (Object.keys(generators) as unknown as GeneratorKey[]).forEach(generatorName => {


            try {
                const generatorValues: GeneratedMapValue<typeof generatorName> = [...generators[generatorName].generate().values()];

                // @ts-ignore
                generatorResults[generatorName] = generatorValues
                generateJson(`${generatorName}.json`, generatorValues, readable, lang);
            } catch (e) {
                const error = e as Error;
                Logger.error(error.message, error.stack)

            }

        });

        const generatorValues: GeneratorValues = generatorResults as GeneratorValues;

        const entchantmentLevelTable = readAsset<Datatable<{
            "itemRarityTag": {
                "TagName": string
            },
            "point": number
        }>[]>('ProjectCoral/Content/ProjectCoral/Data/Enchantment/DT_ItemEnhancementMaterialRarityData.json')[0].Rows;

        const entchantmentLevel = new Map(Object
            .keys(entchantmentLevelTable)
            .map(key => entchantmentLevelTable[key])
            .map(k => ([k.itemRarityTag.TagName, k.point])))

        const getGenericItems = (item: Item) => {
            return generatorValues['tag-based-items'].filter(tbi => tbi.tags.some(tag => item.tags?.includes(tag)))
        }

        const isIngredient = (item: Item, recipe: CookingRecipe): boolean => {
            const tags = getGenericItems(item);

            return recipe.ingredients.some(ingredient => ingredient.item?.id === item?.id) || recipe.genericIngredients.some(genericIngredient => tags.find(tag => tag.key === genericIngredient.key))
                || recipe.eitherOrIngredients.some(ingredients => ingredients.some(ingredient => ingredient.item?.id === item.id))
        }

        const isCraftingIngredient = (item: Item, recipe: CraftingRecipe): boolean => {
            const tags = getGenericItems(item);

            return recipe.ingredients.some(ingredient => ingredient.item?.id === item?.id) || recipe.genericIngredients.some(genericIngredient => tags.find(tag => tag.key === genericIngredient.key))
        }


        const dbItems: DatabaseItem[] = [];
        generatorValues.items.forEach(item => {


            const fish = generatorValues.fish.find(f => f.item.id === item.id);

            const recipes = generatorValues["item-processing"];
            const enemiesDroppingItem = generatorValues["bestiary"].map(sd => ({
                ...sd,
                dropRates: sd.dropRates.filter(dr => dr.item.id === item.id)
            })).filter(sd => sd.dropRates.length)

            const cookingRecipes = generatorValues['cooking-recipes'][0];


            const cookedFrom: CookingRecipe[] = [];
            const usedToCook: CookingRecipe[] = [];

            Object.keys(cookingRecipes).forEach(utensil => {
                cookedFrom.push(...cookingRecipes[utensil].filter(recipe => recipe.item?.id === item.id));
                usedToCook.push(...cookingRecipes[utensil].filter(recipe => isIngredient(item, recipe)));
            })

            const artisanResult: ItemProcessing[] = [];
            const artisanIngredient: ItemProcessing[] = [];

            Object.keys(recipes[0]).forEach(utensil => {
                const utensilRecipes: ItemProcessing[] = recipes[0][utensil];

                utensilRecipes.forEach(item => {
                    item.machine = utensil;
                    if (item.genericInput) {
                        item.genericInput.genericItem = generatorValues['tag-based-items'].find(tbi => tbi.key === item.genericInput?.key)
                    }
                    item.output.item.sellPrice = generatorValues.items.find(i => i.id === item.output.item.id)?.sellPrice
                })
                artisanResult.push(...utensilRecipes.filter(recipe => recipe.output.item.id === item.id));
                artisanIngredient.push(...utensilRecipes.filter(recipe => {
                    const tags = getGenericItems(item);

                    return recipe.input.item.id === item.id || recipe.additionalInput.some(input => input.item.id === item.id) || !!tags.find(tag => tag.key === recipe.genericInput?.genericItem?.key)

                }));
            })

            const craftingRecipes = generatorValues['crafting-recipes'];
            craftingRecipes.forEach(recipe => {
                recipe.item = generatorValues.items.find(item => item.id === recipe.key.toLowerCase());
                recipe.genericIngredients.forEach(gi => gi.genericItem = generatorValues["tag-based-items"].find(item => item.key === gi.key));
            });


            const craftedFrom = craftingRecipes.filter(recipe => recipe.item?.id === item.id);
            const usedToCraft = craftingRecipes.filter(recipe => item && isCraftingIngredient(item, recipe));

            const cropsAndPlants = [...generatorValues['crops'], ...generatorValues['fruit-plants'], ...generatorValues['fruit-trees']]

            const isSeedFor = cropsAndPlants.filter(recipe => recipe.dropData.some(ingredient => ingredient.item?.id === item.id));
            const comesFromSeed = cropsAndPlants.filter(recipe => recipe.item?.id === item.id);


            const buyAtFestivalShop = FestivalNames.map(shopName => {
                const key = `${shopName}-festival-data` as const;
                return (
                    (generatorValues[key][0])?.shops
                        .map(s => s.shop)
                        .flat() ?? []
                )
                    .map(sd => {
                        return {
                            ...sd,
                            festival: {
                                url: shopName,
                                displayName: FestivalDisplayNames[shopName]
                            }
                        }
                    })
            }).flat().filter(altar => {
                return item.id === altar.item.id

            })

            const preferences = flatObjectMap(generatorValues["gift-preferences"]);
            const dataSource: { pref: typeof preferencesMap[0], npcs: MinimalNPC[] }[] = [];


            const prefMap: {
                favoritePreferences: MinimalNPC[];
                lovePreferences: MinimalNPC[];
                likePreferences: MinimalNPC[];
                neutralPreferences: MinimalNPC[];
                dislikePreferences: MinimalNPC[];
                hatePreferences: MinimalNPC[];
            } = {
                favoritePreferences: [],
                lovePreferences: [],
                likePreferences: [],
                neutralPreferences: [],
                dislikePreferences: [],
                hatePreferences: [],
            }


            const keys = [
                'favoritePreferences',
                'lovePreferences',
                'likePreferences',
                'neutralPreferences',
                'dislikePreferences',
                'hatePreferences'
            ] as const

            preferences.forEach(prefs => {
                keys.forEach(key => {
                    const preferenceIndex = prefs[key].findIndex(pref => pref.type === "item" && item.id === pref.item.id);
                    if (preferenceIndex !== -1 && prefs.npc) {
                        prefMap[key].push(prefs.npc);
                    }
                })

            })

            keys.forEach(key => {
                const npcs = prefMap[key];
                if (npcs.length) {
                    dataSource.push({pref: preferencesMap.find(p => p.preferenceField === key)!, npcs})
                }

            })

            const itemUpgrades = ShopNames.map(shopName => {
                // @ts-ignore
                const itemUpgradeData: ItemUpgradeData[] = generatorValues[`${shopName}-item-upgrade`] ?? [];
                return itemUpgradeData.map(sd => {
                    return {
                        ...sd,
                        shop: {
                            url: shopName,
                            displayName: ShopDisplayNames[shopName]
                        }
                    }
                })
            }).flat();

            const isUpgradeResult = itemUpgrades.filter(sd => sd.item.id === item.id).filter(nonNullable);

            const isUpgradeRequirement = itemUpgrades.filter(sd => sd.requirements.some(req => req.item.id === item.id))


            const offeringAltars = generatorValues.offerings;

            const isBundleRewardIn = offeringAltars.map(altar => {
                const offerings = altar.offerings.filter(offering => offering.rewards.items.find(reward => reward.item.id === item.id) || offering.rewards.recipes.find(reward => reward.item.id === item.id));
                if (!offerings.length) return null;
                return {...altar, offerings}
            }).filter(nonNullable);

            const requiredAsOffering = offeringAltars.map(altar => {
                const offerings = altar.offerings.filter(offering => offering.requiredItems.find(reward => {
                    if ('id' in reward.item) {
                        return reward.item.id === item.id;
                    } else {
                        const key = reward.item.key;
                        const items = generatorValues['tag-based-items'].find(t => key === t.key)?.items;

                        return items?.find(t => t.id === item.id)
                    }
                }));
                if (!offerings.length) return null;
                return {...altar, offerings}
            }).filter(nonNullable);


            const buyAt = ShopNames.map(shopName => {

                // @ts-ignore
                const shopData = [
                    // @ts-ignore
                    (generatorValues[`${shopName}-shop-items`] ?? []),
                    // @ts-ignore
                    (generatorValues[`${shopName}-indoor-shop-items`] ?? []),
                    // @ts-ignore
                    (generatorValues[`${shopName}-outdoor-shop-items`] ?? []),

                ].flat()

                // @ts-ignore
                return shopData.map(sd => {
                    return {
                        ...sd,
                        shop: {
                            url: shopName,
                            displayName: ShopDisplayNames[shopName]
                        }
                    }
                })
            }).flat().filter(altar => {
                return item.id === altar.item.id
            });


            const itemProcessShopData = ShopNames.map(shopName => {

                // @ts-ignore
                const shopProcessItems: ItemProcessShopData[] = generatorValues[`${shopName}-shop-process-items`] ?? [];

                return shopProcessItems.map(sd => {
                    return {
                        ...sd,
                        shop: {
                            url: shopName,
                            displayName: ShopDisplayNames[shopName]
                        }
                    }
                })
            }).flat();

            const chanceAsProcessResult = itemProcessShopData.map(sd => {
                const foundItemWithChance = sd.outputChanges.find(output => output.item.id === item?.id)
                if (!foundItemWithChance) return undefined;
                return {
                    ...sd,
                    outputChanges: [foundItemWithChance],

                }
            }).filter(nonNullable);

            const asProcessInput = itemProcessShopData.filter(sd => sd.input.id === item.id)

            const consumables: DatabaseItem['consumables'] = {}

            generatorValues.consumables.filter(c => removeQualityFlag(c.key) === item.id).forEach(c => {
                    const q = getQuality(c.key);
                    switch (q) {
                        case Quality.BASE:
                            consumables.base = c;
                            break;
                        case Quality.BRONZE:
                            consumables.bronze = c;
                            break;
                        case Quality.SILVER:
                            consumables.silver = c;
                            break;
                        case Quality.GOLD:
                            consumables.gold = c;
                            break;
                        case Quality.OSMIUM:
                            consumables.osmium = c;
                            break;
                    }
                }
            )

            const producedByAnimal: DatabaseItem['producedByAnimal'] = generatorValues["animal-data"].find(a => {
                return a.produces.some(p =>
                    p.small?.id === item.id || p.large?.id === item.id
                    || p.smallGolden?.id === item.id || p.largeGolden?.id === item.id
                )
            })
            if (producedByAnimal) {
                const animalShopData = ShopNames.map(name => {
                    const key = name + "-animal-shop-data";
                    // @ts-ignore
                    return key in generatorValues ? generatorValues[key] as AnimalShopData[] : []
                }).flat();
                producedByAnimal.displayName = animalShopData.find(a => a.animalKey === producedByAnimal.key)?.readableName ?? undefined
            }


            let enchantmentPoints: undefined | number;

            item.tags?.forEach(tag => entchantmentLevel.has(tag) ? enchantmentPoints = entchantmentLevel.get(tag) : '');

            const dbItem: DatabaseItem = {
                item,
                fish: fish ? omitFields(fish, 'item') : undefined,
                artisanResult: artisanResult.length ? artisanResult : undefined,
                artisanIngredient: artisanIngredient.length ? artisanIngredient : undefined,
                fromEnemies: enemiesDroppingItem.length ? enemiesDroppingItem : undefined,
                usedToCook: usedToCook.length ? usedToCook : undefined,
                cookedFrom: cookedFrom.length ? cookedFrom : undefined,
                craftedFrom: craftedFrom.length ? craftedFrom : undefined,
                usedToCraft: usedToCraft.length ? usedToCraft : undefined,
                isSeedFor: isSeedFor.length ? isSeedFor : undefined,
                comesFromSeed: comesFromSeed.length ? comesFromSeed : undefined,
                buyAtFestivalShop: buyAtFestivalShop.length ? buyAtFestivalShop : undefined,
                asGift: dataSource.length ? dataSource : undefined,
                insect: generatorValues["bugs-and-insects"].find(critter => critter.item.id === item.id),
                oceanCritter: generatorValues["ocean-critters"].find(critter => critter.item.id === item.id),
                isUpgradeResult: isUpgradeResult.length ? isUpgradeResult : undefined,
                isUpgradeRequirement: isUpgradeRequirement.length ? isUpgradeRequirement : undefined,
                requiredAsOffering: requiredAsOffering.length ? requiredAsOffering : undefined,
                isBundleRewardIn: isBundleRewardIn.length ? isBundleRewardIn : undefined,
                buyAt: buyAt.length ? buyAt : undefined,
                asProcessInput: asProcessInput.length ? asProcessInput : undefined,
                chanceAsProcessResult: chanceAsProcessResult.length ? chanceAsProcessResult : undefined,
                consumables: Object.keys(consumables).length ? consumables : undefined,
                producedByAnimal,
                enchantmentPoints
            }

            generateJson(path.join('items', `${item.id.toLowerCase()}.json`), dbItem, readable, lang);
            dbItems.push(dbItem);

        })
        Logger.info('Create dashboard files')
        DashboardFilesCreation(dbItems);
        Logger.info('Creating dashboard files done')

    } catch (e) {
        // @ts-ignore
        Logger.error('Generators couldn\'t be executed', e.message, e.stack)
    }

})
// Treasure Map Images
new SimpleCopyImageProcessor([
    {
        inputGlob: 'ProjectCoral/Data/TreasureHunt/SavanahTreasureMaps/*.png',
        outputPathSuffix: 'treasure-maps',
        options: {maxWidth: 1024}
    }
], false).process()


itemIconsImageProcessor.process();
new NpcPortraitsImageProcessor(config.characterPortraitsPath, config.portraitPath, config.headPortraitPath, additionalNPCOutfitsMappings).process()
