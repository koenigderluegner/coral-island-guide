import { generateGameVersionFile, generateJson, getParsedArgs, keys, readAsset } from './util/functions';
import { environment } from "./environments/environment";
import chalk from "chalk";
import { config } from "./config";
import { ItemIconsImageProcessor } from "./app/image-processors/item-icons.image-processor";
import { NPCDbGenerator } from "./app/generators/npcs/npc-db.generator";
import { Logger } from "./util/logger.class";
import { NpcPortraitsImageProcessor } from "./app/image-processors/npc-portraits.image-processor";
import { StringTable } from "./util/string-table.class";
import {
    AnimalShopData,
    AvailableLanguages,
    CookingRecipe,
    CraftingRecipe,
    DatabaseItem,
    FestivalDisplayNames,
    FestivalNames,
    Item,
    ItemMixingRecipeData,
    ItemProcessing,
    ItemProcessShopData,
    ItemUpgradeData,
    MinimalNPC,
    Quality,
    ShopDisplayNames,
    ShopItemData,
    ShopNames
} from "@ci/data-types";
import path from "path";
import { flatObjectMap, getQuality, nonNullable, omitFields, removeQualityFlag } from "@ci/util";
import { preferencesMap } from "../../guide/src/app/shared/constants/preference-map.const";
import { Datatable } from "./interfaces/datatable.interface";
import { DashboardFilesCreation } from "./app/dashboard-files-creation.function";
import { SimpleCopyImageProcessor } from "./app/image-processors/simple-copy.image-processor";
import { generateBaseMaps } from "./app/generators/generator-base-data-maps.const";
import { getBetaGenerators } from "./app/generators/generators.beta";
import { getLiveGenerators } from "./app/generators/generators.live";
import { getBaseGenerators } from "./app/generators/generators";
import { generate, MappedGeneratorResults } from "./app/generators/generator-util.type";


const version = generateGameVersionFile();
console.log('CURRENT ENVIRONMENT SET TO ' + chalk.bold(environment.isBeta ? 'BETA' : 'LIVE') + ' - ' + chalk.bold(version) + '\n');

const parsedArgs = getParsedArgs()


const itemIconPath = config.target.itemIconPath
const itemIconsTexturesPath = config.source.texturesPath;
const treeIconTexturesPath = config.source.treeIconPath;
const skipIfExists = !parsedArgs['prepare'] && true;
const itemIconsImageProcessor: ItemIconsImageProcessor = new ItemIconsImageProcessor(itemIconsTexturesPath, itemIconPath, skipIfExists);
const treeIconImageProcessor: ItemIconsImageProcessor = new ItemIconsImageProcessor(treeIconTexturesPath, itemIconPath, skipIfExists);


const readable = !parsedArgs['prepare'] && true;

const additionalNPCOutfitsMappings = [
    {npcKey: 'Semeru', outfitKey: 'SemeruHuman', appearanceName: 'Human Form'},
    {npcKey: 'Denali', outfitKey: 'DenaliHuman', appearanceName: 'Human Form'},
    {npcKey: 'PrincessMiranjani', outfitKey: 'MiranjaniHuman', appearanceName: 'Human Form'},
    {npcKey: 'Raina', outfitKey: 'RainaRecCenter', appearanceName: 'Rec Center'},
    {npcKey: 'Sawee', outfitKey: 'Sawee', appearanceName: 'Mystical Pet'},
    {npcKey: 'Sawee', outfitKey: 'Dragon', appearanceName: 'Mystical Pet'},
    {npcKey: 'Sawee', outfitKey: 'Lembu', appearanceName: 'Mystical Pet'},
];



NPCDbGenerator.AdditionalNpcAppearances = additionalNPCOutfitsMappings;

(AvailableLanguages).forEach((lang, langIndex) => {
    Logger.info(`Generators for "${lang}" starting...`);
    StringTable.defaultLang = lang;

    const {
        itemDbMap,
        calendarDbMap,
        npcDbMap,
        craftingRecipeUnlockedByMasteryDbMap,
        cookingRecipeUnlockedByMasteryDbMap,
        tagBasedItemsDbMap,
        cookingDbMap,
        achievementMap,
        specialItemDbMap,
        mailDataMap,
        heartEventTriggerDataMap,
        festivalDbMap
    } = generateBaseMaps()


    try {

        const baseGenerators = getBaseGenerators(
            itemDbMap,
            calendarDbMap,
            npcDbMap,
            craftingRecipeUnlockedByMasteryDbMap,
            cookingDbMap,
            tagBasedItemsDbMap,
            achievementMap,
            specialItemDbMap,
            mailDataMap,
            cookingRecipeUnlockedByMasteryDbMap,
            festivalDbMap,
            heartEventTriggerDataMap
        );

        let generators = {...baseGenerators}

        if (environment.isBeta) {
            generators = {...generators, ...getBetaGenerators(itemDbMap, tagBasedItemsDbMap)}
        } else {
            generators = {...generators, ...getLiveGenerators(itemDbMap)}
        }


        // @ts-ignore
        const generatorResults: Partial<MappedGeneratorResults<ReturnType<getBetaGenerators>>> & Partial<MappedGeneratorResults<ReturnType<getLiveGenerators>>> & MappedGeneratorResults<typeof baseGenerators> = {};

        (keys(generators)).forEach(generatorName => {


            try {
                const generatorValues = generate(generators, generatorName)

                // @ts-ignore
                generatorResults[generatorName] = generatorValues
                generateJson(`${generatorName}.json`, generatorValues, readable, lang);
            } catch (e) {
                const error = e as Error;
                Logger.error(error.message, error.stack)

            }

        });

        const generatorValues = generatorResults;

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
            return generatorValues['tag-based-items']?.filter(tbi => tbi.tags.some(tag => item.tags?.includes(tag)))
        }

        const isIngredient = (item: Item, recipe: CookingRecipe | ItemMixingRecipeData): boolean => {
            const tags = getGenericItems(item);

            return recipe.ingredients.some(ingredient => ingredient.item?.id === item?.id) || recipe.genericIngredients.some(genericIngredient => tags.find(tag => tag.key === genericIngredient.key))
                || recipe.eitherOrIngredients.some(ingredients => ingredients.some(ingredient => ingredient.item?.id === item.id))
        }

        const isCraftingIngredient = (item: Item, recipe: CraftingRecipe): boolean => {
            const tags = getGenericItems(item);

            return recipe.ingredients.some(ingredient => ingredient.item?.id === item?.id) || recipe.genericIngredients.some(genericIngredient => tags.find(tag => tag.key === genericIngredient.key))
        }


        const dbItems: DatabaseItem[] = [];
        generatorValues.items?.forEach(item => {


            const fish = generatorValues.fish?.find(f => f.item.id === item.id);

            const recipes = generatorValues["item-processing"];
            const enemiesDroppingItem = generatorValues["bestiary"]?.map(sd => ({
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

            const mixingRecipes: ItemMixingRecipeData[] = generatorValues['underwater-seeds-item-mixing-data'] as ItemMixingRecipeData[] ?? [];


            const mixedFrom: ItemMixingRecipeData[] = mixingRecipes.filter(recipe => recipe.item?.id === item.id);
            const usedToMix: ItemMixingRecipeData[] = mixingRecipes.filter(recipe => isIngredient(item, recipe));

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
                const shopData: ShopItemData[] = [
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
                enchantmentPoints,
                mixedFrom: mixedFrom.length ? mixedFrom : undefined,
                usedToMix: usedToMix.length ? usedToMix : undefined,
            }

            generateJson(path.join('items', `${item.id.toLowerCase()}.json`), dbItem, readable, lang);
            dbItems.push(dbItem);

        })


        if (langIndex === AvailableLanguages.length - 1) {
            Logger.info('Create dashboard files')
            DashboardFilesCreation(dbItems, npcDbMap, calendarDbMap, generatorResults['gift-preferences']);
            Logger.info('Creating dashboard files done')

        }

    } catch (e: any) {
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
treeIconImageProcessor.process();
new NpcPortraitsImageProcessor(config.source.portraitsPath, config.target.portraitPath, config.target.headPortraitPath, additionalNPCOutfitsMappings).process()
