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
import { HeartEventsDbGenerator } from "./app/heart-events-db.generator";
import { MuseumChecklistGenerator } from "./app/museum-checklist.generator";
import { ItemProcessorMapGenerator } from "./app/item-processor-map.generator";
import { CookingRecipesChecklistGenerator } from "./app/cooking-recipes-checklist.generator";
import { CalendarGenerator } from "./app/calendar.generator";
import { MailDataGenerator } from "./app/mail-data.generator";
import { TornPagesGenerator } from "./app/torn-pages.generator";
import { BestiaryGenerator } from "./app/bestiary.generator";
import { CookingUtensilMapGenerator } from "./app/cooking-utensil-map.generator";
import { StringTable } from "./util/string-table.class";
import { AvailableLanguages, DatabaseItem, FestivalEventIds, Item, ItemProcessing } from "@ci/data-types";
import { AnimalMoodSizeGenerator } from "./app/animal-mood-size.generator";
import { AnimalDataGenerator } from "./app/animal-data.generator";
import { AnimalShopDataGenerator } from "./app/animal-shop-data.generator";
import { FestivalDbGenerator } from "./app/festival-db.generator";
import { FestivalShopItemDataGenerator } from "./app/festival-shop-item-data.generator";
import { FestivalDataGenerator } from "./app/festival-data.generator";
import path from "path";
import { omitFields } from "@ci/util";

console.log('CURRENT ENVIRONMENT SET TO ' + chalk.bold(environment.isBeta ? 'BETA' : 'LIVE') + '\n');

const parsedArgs = getParsedArgs()


const itemIconPath = config.itemIconPath
const itemIconsTexturesPath = config.texturesPath;
const skipIfExists = !parsedArgs['prepare'] && true;
const itemIconsImageProcessor: ItemIconsImageProcessor = new ItemIconsImageProcessor(itemIconsTexturesPath, itemIconPath, skipIfExists);


const readable = !parsedArgs['prepare'] && true;



AvailableLanguages.forEach(lang => {
    Logger.info(`Generators for "${lang}" starting...`);
    StringTable.defaultLang = lang;

    const itemDbGenerator = new ItemDbGenerator();
    const itemDbMap = itemDbGenerator.generate();

    DaFilesParser.ItemMap = itemDbMap;

    let calendarDbMap;

    if (!environment.isBeta) {
        const calendarDbGenerator = new CalendarGenerator();
        calendarDbMap = calendarDbGenerator.generate();
    }

    const npcDbGenerator = new NPCDbGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/AI/DT_NPCs.json', calendarDbMap);
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
            betaGenerators = {}
        } else {
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


            liveGenerators = {

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
            }
        }


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
            'animal-shop-data': {
                generate: () => new AnimalShopDataGenerator().generate({
                    daFiles: [
                        'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DA_AnimalShopAdvanceRequirement.json',

                    ]
                })
            },

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

        const getGenericItems = (item: Item) => {
            return generatorValues['tag-based-items'].filter(tbi => tbi.tags.some(tag => item.tags?.includes(tag)))
        }

        generatorValues.items.forEach(item => {


            const fish = generatorValues.fish.find(f => f.item.id === item.id);

            const recipes = generatorValues["item-processing"];


            const craftedFrom: ItemProcessing[] = [];
            const usedIn: ItemProcessing[] = [];

            Object.keys(recipes[0]).forEach(utensil => {
                const utensilRecipes: ItemProcessing[] = recipes[0][utensil];
                craftedFrom.push(...utensilRecipes.filter(recipe => recipe.output.item.id === item.id));
                usedIn.push(...utensilRecipes.filter(recipe => {
                    const tags = getGenericItems(item);

                    return recipe.input.item.id === item.id || recipe.additionalInput.some(input => input.item.id === item.id) || !!tags.find(tag => tag.key === recipe.genericInput?.genericItem?.key)

                }));
            })


            const dbItem: DatabaseItem = {
                ...item,
                fish: fish ? omitFields(fish, 'item') : undefined,
                artisanResult: craftedFrom.length ? craftedFrom : undefined,
                artisanIngredient: usedIn.length ? usedIn : undefined
            }

            generateJson(path.join('items', `${item.id.toLowerCase()}.json`), dbItem, readable, lang);


        })


    } catch (e) {
        // @ts-ignore
        Logger.error('Generators couldn\'t be executed', e.message, e.stack)
    }

})
itemIconsImageProcessor.process();
new NpcPortraitsImageProcessor(config.characterPortraitsPath, config.portaitPath, config.headPortaitPath).process()
