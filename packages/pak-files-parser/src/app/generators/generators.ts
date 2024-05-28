import { GeneratorList } from "./generator-list.type";
import {
    Achievement,
    CalendarEvent,
    CookingRecipe,
    Festival,
    FestivalEventIds,
    HeartEventTriggerData,
    Item,
    MailData,
    NPC,
    SpecialItem,
    TagBasedItem,
    UnlockByMastery
} from "@ci/data-types";
import { CraftingRecipeDbGenerator } from "./item-processing/crafting-recipe-db.generator";
import { BugsAndInsectsDbGenerator } from "./catchables/bugs-and-insects-db.generator";
import { OceanCritterDbGenerator } from "./catchables/ocean-critter-db.generator";
import { FishDbGenerator } from "./catchables/fish-db.generator";
import { CropsDbGenerator } from "./plantables/crops-db.generator";
import { FruitTreeDbGenerator } from "./plantables/fruit-tree-db.generator";
import { FruitPlantDbGenerator } from "./plantables/fruit-plant-db.generator";
import { ItemProcessorDbGenerator } from "./item-processing/item-processor-db.generator";
import { JournalOrderDbGenerator } from "./journal/journal-order-db.generator";
import { OfferingsDbGenerator } from "./offerings/offerings-db.generator";
import { GiftPreferencesDbGenerator } from "./npcs/gift-preferences-db.generator";
import { ConsumablesDbGenerator } from "./items/consumables-db.generator";
import { BlacksmithOpeningHoursGenerator } from "../opening-hours-generators/blacksmith-opening-hours.generator";
import { ShopItemDataGenerator } from "./shops-and-festivals/shop-item-data.generator";
import { ItemProcessShopGenerator } from "./catchables/item-process-shop.generator";
import { ItemUpgradeDataGenerator } from "./shops-and-festivals/item-upgrade-data.generator";
import { LabOpeningHoursGenerator } from "../opening-hours-generators/lab-opening-hours.generator";
import { GeneralStoreOpeningHoursGenerator } from "../opening-hours-generators/general-store-opening-hours.generator";
import { RanchOpeningHoursGenerator } from "../opening-hours-generators/ranch-opening-hours.generator";
import { AnimalShopDataGenerator } from "./shops-and-festivals/animal-shop-data.generator";
import { BaseOpeningHoursGenerator } from "../opening-hours-generators/base-opening-hours.generator";
import { BeachShackOpeningHoursGenerator } from "../opening-hours-generators/beach-shack-opening-hours.generator";
import { CarpenterOpeningHoursGenerator } from "../opening-hours-generators/carpenter-opening-hours.generator";
import { environment } from "../../environments/environment";
import { PetShopAdoptionsGenerator } from "./shops-and-festivals/pet-shop-adoptions.generator";
import { AnimalDataGenerator } from "./animal/animal-data.generator";
import { AnimalMoodSizeGenerator } from "./animal/animal-mood-size.generator";
import { TornPagesGenerator } from "./journal/torn-pages.generator";
import { BestiaryGenerator } from "./journal/bestiary.generator";
import { FestivalDataGenerator } from "./shops-and-festivals/festival-data.generator";
import { FestivalShopItemDataGenerator } from "./shops-and-festivals/festival-shop-item-data.generator";
import { MeritExchangeShopDataGenerator } from "./shops-and-festivals/merit-exchange-shop-data.generator";
import { HeartEventsDbGenerator } from "./heart-events/heart-events-db.generator";
import { MuseumChecklistGenerator } from "./misc/museum-checklist.generator";
import { CookingRecipesChecklistGenerator } from "./cooking/cooking-recipes-checklist.generator";
import { ItemProcessorMapGenerator } from "./item-processing/item-processor-map.generator";
import { CookingUtensilMapGenerator } from "./cooking/cooking-utensil-map.generator";

export const getBaseGenerators = (itemDbMap: Map<string, Item>,
                                  calendarDbMap: Map<string, CalendarEvent[]>,
                                  npcDbMap: Map<string, NPC>,
                                  craftingRecipeUnlockedByMasteryDbMap: Map<string, UnlockByMastery>,
                                  cookingDbMap: Map<string, Record<string, CookingRecipe[]>>,
                                  tagBasedItemsDbMap: Map<string, TagBasedItem>,
                                  achievementMap: Map<string, Achievement>,
                                  specialItemDbMap: Map<string, SpecialItem>,
                                  mailDataMap: Map<string, MailData>,
                                  cookingRecipeUnlockedByMasteryDbMap: Map<string, UnlockByMastery>,
                                  festivalDbMap: Map<string, Festival>,
                                  heartEventTriggerDataMap: Map<string, HeartEventTriggerData>) => {
    const festivalDbValues = [...festivalDbMap.values()];
    return {
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


        'merfolk-general-store-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_ShopMerfolkGeneralStore.json', {
            itemShipUnlockData: environment.isBeta ? 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/GeneralMerfok/DT_MerfolkGeneralItemShipUnlock.json' : undefined
        }),
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


        'cherry-blossom-festival-opening-hours': new BaseOpeningHoursGenerator({'Festival': 'ProjectCoral/Content/ProjectCoral/Data/OpeningHours/FestivalHour/CherryBlossomHour.json'}),
        'cherry-blossom-festival-data': new FestivalDataGenerator(festivalDbValues.find(f => f.eventId === FestivalEventIds["cherry-blossom"])!, [
            {
                title: 'Booth',
                shop: new FestivalShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/Festival/DT_CherryBlossomFestivalShop.json').generate()
            }
        ]),


        'tree-planting-festival-opening-hours': new BaseOpeningHoursGenerator({'Festival': 'ProjectCoral/Content/ProjectCoral/Data/OpeningHours/FestivalHour/TreePlantingHour.json'}),
        'tree-planting-festival-data': new FestivalDataGenerator(festivalDbValues.find(f => f.eventId === FestivalEventIds["tree-planting"])!, [
            {
                title: 'Shop',
                shop: new FestivalShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/Festival/DT_TreePlantingFestivalShop.json').generate()
            }
        ]),


        'animal-festival-opening-hours': new BaseOpeningHoursGenerator({'Festival': 'ProjectCoral/Content/ProjectCoral/Data/OpeningHours/FestivalHour/AnimalFestivalHour.json'}),
        'animal-festival-data': new FestivalDataGenerator(festivalDbValues.find(f => f.eventId === FestivalEventIds["animal"])!, [
            {
                title: 'Shop',
                shop: new FestivalShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/Festival/DT_AnimalFestivalShop.json').generate()
            }
        ]),

        'beach-clean-up-festival-opening-hours': new BaseOpeningHoursGenerator({'Festival': 'ProjectCoral/Content/ProjectCoral/Data/OpeningHours/FestivalHour/BeachCleanUpHour.json'}),
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

        'harvest-festival-opening-hours': new BaseOpeningHoursGenerator({'Festival': 'ProjectCoral/Content/ProjectCoral/Data/OpeningHours/FestivalHour/MoonCakeHour.json'}),
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
        'spooky-festival-opening-hours': new BaseOpeningHoursGenerator({'Festival': 'ProjectCoral/Content/ProjectCoral/Data/OpeningHours/FestivalHour/SpookyDayHour.json'}),
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
        'new-year-eve-festival-opening-hours': new BaseOpeningHoursGenerator({'Festival': 'ProjectCoral/Content/ProjectCoral/Data/OpeningHours/FestivalHour/NewYearFeastHour.json'}),
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
    } as const satisfies GeneratorList
}


