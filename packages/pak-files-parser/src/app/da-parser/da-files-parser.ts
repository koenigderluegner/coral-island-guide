import { minifyItem, readAsset, unifyInternalPath } from "../../util/functions";
import {
    GameplayEffectsConfig,
    GameplayEffectsConfigEntry,
    GameplayEffectsConfigMap
} from "../../types/offering-reward-config.type";
import { Logger } from "../../util/logger.class";
import {
    Achievement,
    CompleteMiningRequirement,
    CookingRecipe,
    CountNpcHeartLevelRequirement,
    DateSeasonRangeRequirement,
    DateSeasonRequirement,
    DinoHologramItemRewardClaimedRequirement,
    EditorOnlyRequirement,
    Effect,
    FarmHouseRequirement,
    HasCookingUtensilRequirement,
    HealedCoralRequirement,
    IsAchievementCompletedRequirement,
    IsCutsceneTriggeredRequirement,
    IsGiantUnlockedRequirement,
    IsMailReadRequirement,
    IsMultiplayerRequirement,
    Item,
    ItemInInventoryRequirement,
    ItemWithCategoryInInventoryRequirement,
    MailData,
    MarriageHasProposedRequirement,
    MasteryLevelRequirements,
    MetaForType,
    MountAcquiredRequirement,
    NpcHeartLevelRequirement,
    ObjectStateRequirement,
    QuestActiveRequirement,
    QuestFactComparators,
    QuestFactCompareRequirement,
    QuestFactRequirement,
    Requirement,
    RequirementEntry,
    SpecialItem,
    SpecialItemRequirement,
    TempleLevelRequirement,
    TimeDateRequirement,
} from "@ci/data-types";
import { getEnumValue, nonNullable } from "@ci/util";
import path from "path";
import fs from 'fs';
import { environment } from "../../environments/environment";
import {
    GameplayRequirementsConfig,
    GameplayRequirementsConfigEntry,
    GameplayRequirementsConfigMap
} from "../../interfaces/raw-data-interfaces/da-file-parse/requirements/gameplay-requirement-config.type";
import { convertEffectsWithoutMeta } from "../../interfaces/raw-data-interfaces/da-file-parse/effects/raw-effect-without-meta";
import { convertEffectsWithMeta, } from "../../interfaces/raw-data-interfaces/da-file-parse/effects/raw-effect-with-meta";

export type EffectEntry = {
    key: string,
    effects: Effect[]
};
export type EffectMap = Map<string, EffectEntry>;


export type RequirementMap = Map<string, RequirementEntry>;

export class DaFilesParser {

    static ItemMap: Map<string, Item>;
    static SpecialItemMap: Map<string, SpecialItem>;
    static AchievementMap: Map<string, Achievement>;
    static MailMap: Map<string, MailData>;
    static CookingMap: Map<string, Record<string, CookingRecipe[]>>;

    static readAssets: Map<string, GameplayEffectsConfigEntry[] | GameplayRequirementsConfigEntry[]> = new Map<string, GameplayEffectsConfigEntry[] | GameplayRequirementsConfigEntry[]>();

    private changeObjectEffectsCustomNames: Map<string, string> = new Map<string, string>([
        ['ComCenLobbyPiano', 'Community Center Piano'],
        ['museum', 'Museum'],
    ])

    parse(filePath: string): EffectMap | RequirementMap | undefined {
        const fullPath = unifyInternalPath(path.join(environment.assetPath, filePath));
        if (!DaFilesParser.readAssets.has(fullPath)) {
            if (fs.existsSync(fullPath)) {
                const asset = readAsset<GameplayEffectsConfigEntry[] | GameplayRequirementsConfigEntry[]>(filePath);
                DaFilesParser.readAssets.set(fullPath, asset);
            } else {
                Logger.error(`Da-File does not exist ${fullPath}`)
            }
        }

        const readFile = DaFilesParser.readAssets.get(fullPath)!

        let mappingEntry: GameplayRequirementsConfig | GameplayEffectsConfig | undefined = readFile.find((a): a is GameplayEffectsConfig => a.Type.includes("C_GameplayEffectsConfig"));

        if (mappingEntry) {
            return this.parseGameplayEffects(mappingEntry);
        }
        mappingEntry = readFile.find((a): a is GameplayRequirementsConfig => a.Type.includes("C_GameplayRequirementsConfig"));

        if (mappingEntry) {
            return this.parseGameplayRequirements(mappingEntry);
        }

        return undefined


    }


    private parseGameplayEffects(mappingEntry: GameplayEffectsConfig): EffectMap {
        const result = new Map<string, EffectEntry>
        const map = mappingEntry.Properties.map;
        const recipeRecord = [...DaFilesParser.CookingMap.values()][0];
        const recipes = Object.keys(recipeRecord).reduce((previousValue: CookingRecipe[], currentValue) => {
            previousValue.push(...recipeRecord[currentValue]);
            return previousValue
        }, [])

        let conf: GameplayEffectsConfigMap[];


        if (!Array.isArray(map)) {
            conf = [map]
        } else {
            conf = map
        }


        conf.forEach(key => {

            const effects = key.Value.effects.map(effect => {

                const [daPath, index] = effect.ObjectPath.split('.');

                const daJson = unifyInternalPath(daPath + '.json');
                const fullDaPath = unifyInternalPath(path.join(environment.assetPath, daJson))
                if (!DaFilesParser.readAssets.has(fullDaPath)) {

                    // if (fs.existsSync(fullDaPath)) {
                    //     this.readAssets.set(fullDaPath, readAsset<(GameplayEffectsConfigEntry)[]>(daJson));
                    // } else {
                    //     Logger.error(`Da-File does not exist ${fullDaPath}`)
                    // }

                }

                const foundEffect = DaFilesParser.readAssets.get(fullDaPath)?.[+index];

                if (!foundEffect) {
                    Logger.error(`Didnt find ${key}.${index}`);
                    return
                }
                let daEffect: Effect | undefined = undefined;

                switch (foundEffect.Type) {
                    case "C_ChangeAppearancePotionEffect":
                    case "C_BoostMaxStaminaEffect":
                    case "C_BoostMaxHealthEffect": {

                        daEffect = convertEffectsWithoutMeta(foundEffect);
                        break;
                    }
                    case 'C_UnlockSpecialItemEffect':
                        const item = DaFilesParser.SpecialItemMap.get(foundEffect.Properties.item.RowName)

                        if (!item) return;

                        daEffect = convertEffectsWithMeta(foundEffect, () => ({
                                item: minifyItem(item)
                            })
                        );
                        break;
                    case "C_AddItemToInventoryEffect": {

                        const {itemData, ...rest} = foundEffect.Properties
                        const item = DaFilesParser.ItemMap.get(itemData.itemID)

                        if (!item) return;

                        daEffect = convertEffectsWithMeta(foundEffect, () => ({
                                item: minifyItem(item),
                                ...rest
                            })
                        );

                        break;
                    }
                    case "C_UnlockCookingUtelsilEffect": {
                        daEffect = convertEffectsWithMeta({
                            ...foundEffect,
                            Type: 'C_UnlockCookingUtensilEffect',
                            Class: `UScriptClass'C_UnlockCookingUtensilEffect'`,
                            Properties: foundEffect.Properties ?? {utensilToUnlock: 'FryingPan'}
                        }, (p) => ({
                            utensil: getEnumValue(p.utensilToUnlock)
                        }));

                        break;
                    }
                    case "C_SetQuestFactValueEffect": {
                        daEffect = convertEffectsWithMeta(foundEffect, (p) => ({
                                factName: p.fact.factName.RowName
                            })
                        );
                        break;
                    }
                    case "C_MarkDinoHologramRewardClaimed": {
                        daEffect = convertEffectsWithMeta({
                            ...foundEffect,
                            Type: 'C_MarkDinoHologramRewardClaimedEffect',
                            Class: `UScriptClass'C_MarkDinoHologramRewardClaimedEffect'`,
                            Properties: foundEffect.Properties ?? {utensil: 'FryingPan'}
                        }, (p) => ({
                            dinoName: p.dinoId.dinosaursName.RowName
                        }));
                        break;
                    }
                    case "C_UnlockCookingRecipeEffect": {

                        const item = recipes.find(r => r.cookingKey === foundEffect.Properties.recipe.RowName)?.item

                        if (!item) {
                            Logger.error(`DaFilesParser: Cant find recipe for ${foundEffect.Properties.recipe.RowName}`)
                            return;
                        }

                        daEffect = convertEffectsWithMeta(foundEffect, () => ({
                                item: minifyItem(item)
                            })
                        );
                        break;
                    }
                    case "C_UnlockCraftingRecipeEffect": {

                        const item = DaFilesParser.ItemMap.get(foundEffect.Properties.recipe.RowName.toLowerCase())

                        if (!item) return;

                        daEffect = convertEffectsWithMeta(foundEffect, () => ({
                                item: minifyItem(item)
                            })
                        );

                        break;


                    }
                    case "C_ConsumeItemMasteryEffect": {

                        daEffect = convertEffectsWithMeta(foundEffect, (p) => ({
                                mastery: getEnumValue(p.masteryType)
                            })
                        );
                        break;


                    }
                    case "C_VaryMoneyEffect": {

                        daEffect = convertEffectsWithMeta(foundEffect, (p) => ({amount: p.amount}))
                        break;


                    }
                    case "C_ChangeObjectStateEffect": {
                        const meta: MetaForType<'ChangeObjectState'> = {
                            id: foundEffect.Properties.id,
                            state: foundEffect.Properties.state
                        };
                        const customName = this.changeObjectEffectsCustomNames.get(foundEffect.Properties.id);

                        if (customName) {
                            meta['customName'] = customName
                        }
                        daEffect = daEffect = convertEffectsWithMeta(foundEffect, () => meta)
                        break;


                    }
                    case "C_UpdateNPCScheduleEffect": {

                        daEffect = convertEffectsWithMeta(foundEffect, (p) => ({npcIds: p.npcIDs}))

                        break;


                    }
                    case "C_SendMailToPlayerEffect": {
                        const mailId = foundEffect.Properties.mailId;
                        const mail = DaFilesParser.MailMap.get(mailId)

                        if (!mail) {
                            Logger.error(`DaFilesParser: Can't find mail with mailId ${mailId}`)
                            return;
                        }
                        daEffect = convertEffectsWithMeta(foundEffect, (p) => ({
                            mail: {
                                mailId,
                                title: mail.title ?? mailId
                            },
                            dayDelay: p.dayDelay
                        }))
                        break;


                    }
                    case "C_SetQuestCompletedEffect":
                    case "C_SetQuestActiveEffect": {
                        daEffect = convertEffectsWithMeta(foundEffect, (p) => ({questId: p.questId}))
                        break;
                    }

                    case "C_RemoveItemFromInventoryEffect": {

                        let meta: MetaForType<'RemoveItemFromInventory'>;

                        if ('removeByCategory' in foundEffect.Properties) {
                            //get  GiftCategory
                            meta = {
                                category: foundEffect.Properties.itemCategory.data.RowName,
                                amount: foundEffect.Properties.quantity ?? 1
                            }
                        } else {
                            const item = DaFilesParser.ItemMap.get(foundEffect.Properties.itemId.itemID)

                            if (!item) return;

                            meta = {item: minifyItem(item), amount: foundEffect.Properties.quantity ?? 1}
                        }

                        daEffect = convertEffectsWithMeta(foundEffect, () => meta)
                        break;


                    }

                    default: {
                        Logger.error(`Cannot find effect definition for ${foundEffect.Type} in ${fullDaPath}`)
                    }
                }

                return daEffect;

            }).filter(nonNullable)

            result.set(key.Key, {key: key.Key, effects})
        })

        return result
    }

    private parseGameplayRequirements(mappingEntry: GameplayRequirementsConfig): RequirementMap {
        const result: RequirementMap = new Map<string, RequirementEntry>
        const map = mappingEntry.Properties?.map;

        if (!map) return new Map()

        let conf: GameplayRequirementsConfigMap[];

        if (!Array.isArray(map)) {
            conf = [map]
        } else {
            conf = map
        }


        conf.forEach(key => {


            const reqs = key.Value.requirements.map(effect => {


                if (!effect) return;

                const [daPath, index] = effect.ObjectPath.split('.');

                const daJson = unifyInternalPath(daPath + '.json');
                const fullDaPath = unifyInternalPath(path.join(environment.assetPath, daJson));
                if (!DaFilesParser.readAssets.has(fullDaPath)) {

                    // if (fs.existsSync(fullDaPath)) {
                    //     this.readAssets.set(fullDaPath, readAsset<(GameplayEffectsConfigEntry)[]>(daJson));
                    // } else {
                    //     Logger.error(`Da-File does not exist ${fullDaPath}`)
                    // }

                }

                const foundEffect = (DaFilesParser.readAssets.get(fullDaPath) as GameplayRequirementsConfigEntry[] | undefined)?.[+index];

                if (!foundEffect) {
                    Logger.error(`Didnt find ${key}.${index}`);
                    return
                }

                let daEffect: Requirement | undefined = undefined;

                switch (foundEffect.Type) {
                    case "C_IsMailReadRequirement":
                        const mailId = foundEffect.Properties.mailId;
                        const mail = DaFilesParser.MailMap.get(mailId)

                        if (!mail) {
                            Logger.error(`DaFilesParser: Can't find mail with mailId ${mailId}`)
                            return;
                        }

                        daEffect = {
                            type: "IsMailRead",
                            meta: {
                                mailId,
                                title: mail.title ?? mailId
                            }
                        } satisfies IsMailReadRequirement;
                        break;
                    case "C_CountNPCHeartLevelRequirement": {
                        daEffect = {
                            type: "CountNPCHeartLevel",
                            meta: {
                                expectedHeartLevel: foundEffect.Properties.expectedHeartLevel
                            }
                        } satisfies CountNpcHeartLevelRequirement;
                        break;
                    }
                    case "C_DinoHologramItemRewardClaimed": {
                        daEffect = {
                            type: "DinoHologramItemRewardClaimed",
                            meta: {
                                dinosaursName: foundEffect.Properties.dinoHologram.dinosaursName.RowName
                            }
                        } satisfies DinoHologramItemRewardClaimedRequirement;
                        break;
                    }
                    case "C_NPCHeartLevelRequirement": {
                        daEffect = {
                            type: "NPCHeartLevel",
                            meta: {
                                expectedHeartLevel: foundEffect.Properties.expectedHeartLevel,
                                npcKey: foundEffect.Properties.NPCId
                            }
                        } satisfies NpcHeartLevelRequirement;
                        break;
                    }
                    case "C_TimeDateRequirement": {
                        daEffect = {
                            type: "TimeDate",
                            meta: {
                                inverted: foundEffect.Properties.invertResult,
                                clampDateRange: foundEffect.Properties.clampDateRange,
                                conditionType: getEnumValue(foundEffect.Properties.conditionType),
                                dateRange: {
                                    isValidIndefinitelyOnceStarted: foundEffect.Properties.dateRange.isValidIndefinitelyOnceStarted,
                                    isValidOnSpecificDate: foundEffect.Properties.dateRange.isValidOnSpecificDate,
                                    startsFrom: {
                                        day: foundEffect.Properties.dateRange.startsFrom.day ?? 1,
                                        season: getEnumValue(foundEffect.Properties.dateRange.startsFrom.season),
                                        year: foundEffect.Properties.dateRange.startsFrom.year ?? 1,

                                    },
                                    lastsTill: {
                                        day: foundEffect.Properties.dateRange.lastsTill.day ?? 1,
                                        season: getEnumValue(foundEffect.Properties.dateRange.lastsTill.season),
                                        year: foundEffect.Properties.dateRange.lastsTill.year ?? 1,

                                    }
                                }
                            }
                        } satisfies TimeDateRequirement;
                        break;
                    }
                    case "C_DateSeasonRequirement": {
                        daEffect = {
                            type: "DateSeason",
                            meta: {
                                day: foundEffect.Properties.expectedDateSeason.day,
                                season: getEnumValue(foundEffect.Properties.expectedDateSeason.season)
                            }
                        } satisfies DateSeasonRequirement;
                        break;
                    }

                    case "C_EditorOnlyRequirement": {
                        daEffect = {
                            type: "EditorOnly",

                        } satisfies EditorOnlyRequirement;

                        break;
                    }
                    case "C_IsMultiplayerRequirement": {
                        daEffect = {
                            type: "IsMultiplayer",

                        } satisfies IsMultiplayerRequirement;

                        break;
                    }

                    case "C_IsAchievementCompletedRequirement": {

                        const achievement = DaFilesParser.AchievementMap.get(foundEffect.Properties.achievementId)

                        if (!achievement) return;


                        daEffect = {
                            type: "IsAchievementCompleted",
                            meta: {
                                achievement
                            }
                        } satisfies IsAchievementCompletedRequirement;
                        break;
                    }
                    case "C_IsCutsceneTriggeredRequirement": {
                        daEffect = {
                            type: "IsCutsceneTriggered",
                            meta: {
                                cutsceneTopic: foundEffect.Properties.cutsceneTopic
                            }
                        } satisfies IsCutsceneTriggeredRequirement;
                        break;
                    }

                    case "C_IsGiantUnlockedRequirement": {
                        daEffect = {
                            type: "IsGiantUnlocked",
                            meta: {
                                types: foundEffect.Properties.types
                            }
                        } satisfies IsGiantUnlockedRequirement;
                        break;
                    }


                    case "C_MarriageHasProposedRequirement": {
                        daEffect = {
                            type: "MarriageHasProposed",
                            meta: {inverted: foundEffect.Properties?.invertResult},

                        } satisfies MarriageHasProposedRequirement;
                        break;
                    }


                    case "C_MountAcquiredRequirement": {
                        daEffect = {
                            type: "MountAcquired",
                            meta: {
                                inverted: foundEffect.Properties?.invertResult
                            }

                        } satisfies MountAcquiredRequirement;
                        break;
                    }

                    case "C_HasCookingUtensilReuirement": {
                        daEffect = {
                            type: "HasCookingUtensil",
                            meta: {
                                utensil: foundEffect.Properties.requiredUtensil ? getEnumValue(foundEffect.Properties.requiredUtensil) : undefined,
                                inverted: foundEffect.Properties.invertResult
                            }

                        } satisfies HasCookingUtensilRequirement;
                        break;
                    }


                    case "C_QuestFactRequirement": {
                        daEffect = {
                            type: "QuestFact",
                            meta: {
                                factName: foundEffect.Properties.fact.factName.RowName
                            }
                        } satisfies QuestFactRequirement;
                        break;
                    }

                    case "C_QuestFactCompareRequirement": {
                        const comparator: QuestFactCompareRequirement['meta']['comparator'] = getEnumValue(foundEffect.Properties.factCompare.compareType) as QuestFactCompareRequirement['meta']['comparator'];
                        if (!QuestFactComparators.includes(comparator)) {
                            Logger.error(`Unknown comparator for quest fact compare: ${comparator}`)
                            return;
                        }
                        daEffect = {
                            type: "QuestFactCompare",
                            meta: {
                                factName: foundEffect.Properties.fact.factName.RowName,
                                comparator,
                                value: foundEffect.Properties.factCompare.comparedInteger
                            }
                        } satisfies QuestFactCompareRequirement;
                        break;
                    }

                    case "C_ObjectStateRequirement": {

                        daEffect = {
                            type: "ObjectState",
                            meta: {
                                id: foundEffect.Properties.id,
                                state: foundEffect.Properties.requiredState
                            }
                        } satisfies ObjectStateRequirement;

                        const customName = this.changeObjectEffectsCustomNames.get(foundEffect.Properties.id);

                        if (customName) {
                            daEffect.meta['customName'] = customName
                        }
                        break;


                    }
                    case "C_HealedCoralRequirement": {

                        daEffect = {
                            type: "HealedCoral",
                            meta: {
                                required: foundEffect.Properties.required,
                            }
                        } satisfies HealedCoralRequirement;

                        break;
                    }


                    case "C_TempleLevelRequirement": {
                        daEffect = {
                            type: "TempleLevel",
                            meta: {
                                level: foundEffect.Properties.requiredLevel
                            }
                        } satisfies TempleLevelRequirement;
                        break;
                    }
                    case "C_MasteryLevelRequirement": {
                        daEffect = {
                            type: "MasteryLevel",
                            meta: {
                                level: foundEffect.Properties.expectedMasteryLevel,
                                mastery: getEnumValue(foundEffect.Properties.masteryType)
                            }
                        } satisfies MasteryLevelRequirements;
                        break;
                    }
                    case "C_CompleteMiningRequirement": {
                        daEffect = {
                            type: "CompleteMining",
                            meta: {
                                level: foundEffect.Properties.requiredLevel,
                                mine: foundEffect.Properties.miningTheme ? getEnumValue(foundEffect.Properties.miningTheme) : 'Earth'
                            }
                        } satisfies CompleteMiningRequirement;
                        break;
                    }
                    case "C_FarmHouseRequirement": {
                        daEffect = {
                            type: "FarmHouseLevel",
                            meta: {
                                level: foundEffect.Properties.requiredLevel
                            }
                        } satisfies FarmHouseRequirement;
                        break;
                    }

                    case "C_QuestActiveRequirement": {
                        daEffect = {
                            type: "QuestActive",
                            meta: {
                                questId: foundEffect.Properties.questId
                            }
                        } satisfies QuestActiveRequirement;
                        break;
                    }


                    case "C_SpecialItemRequirement": {

                        const item = DaFilesParser.SpecialItemMap.get(foundEffect.Properties.item.RowName)

                        if (!item) return;


                        daEffect = {
                            type: "SpecialItem",
                            meta: {
                                item: minifyItem(item)
                            }
                        } satisfies SpecialItemRequirement;
                        break;
                    }

                    case "C_ItemInInventoryRequirement": {

                        const item = DaFilesParser.ItemMap.get(foundEffect.Properties.inventoryItem.itemID)

                        if (!item) return;


                        daEffect = {
                            type: "ItemInInventory",
                            meta: {
                                item: minifyItem(item),
                                amount: foundEffect.Properties.expectedAmount ?? 1,
                            }
                        } satisfies ItemInInventoryRequirement;

                        if (foundEffect.Properties.qualityRequirement) {
                            daEffect.meta.requiredQuality = getEnumValue(foundEffect.Properties.qualityRequirement.rules)
                        }
                        break;
                    }

                    case "C_ItemWithCategoryInInventoryRequirement": {

                        daEffect = {
                            type: "ItemWithCategoryInInventory",
                            meta: {
                                categoryName: foundEffect.Properties.category.data.RowName,
                                amount: foundEffect.Properties.expectedAmount ?? 1,
                            }
                        } satisfies ItemWithCategoryInInventoryRequirement;

                        break;
                    }
                    case "C_DateSeasonRangeRequirement": {

                        daEffect = {
                            type: "DateSeasonRange",
                            meta: {
                                inverted: foundEffect.Properties.invertResult,
                                from: {
                                    day: foundEffect.Properties.expectedDateSeason.from.day,
                                    season: getEnumValue(foundEffect.Properties.expectedDateSeason.from.season),
                                    year: -1
                                },
                                to: {
                                    day: foundEffect.Properties.expectedDateSeason.to.day,
                                    season: getEnumValue(foundEffect.Properties.expectedDateSeason.to.season),
                                    year: -1
                                }
                            }
                        } satisfies DateSeasonRangeRequirement;
                        break;
                    }

                    default: {
                        Logger.error(`Cannot find requirement definition for ${foundEffect.Type} in ${fullDaPath}`)
                    }

                }


                return daEffect;

            }).filter(nonNullable)

            result.set(key.Key, {key: key.Key, type: getEnumValue(key.Value.type), requirements: reqs})

        })

        return result;
    }
}

