import { minifyItem, readAsset } from "../util/functions";
import {
    GameplayEffectsConfig,
    GameplayEffectsConfigEntry,
    GameplayEffectsConfigMap
} from "../types/offering-reward-config.type";
import { Logger } from "../util/logger.class";
import {
    Achievement,
    AddItemToInventoryEffect,
    BoostMaxStaminaEffect,
    ChangeObjectStateEffect,
    CompleteMiningRequirement,
    ConsumeMasteryItemEffect,
    CookingRecipe,
    CountNpcHeartLevelRequirement,
    DateSeasonRangeRequirement,
    EditorOnlyRequirement,
    Effect,
    FarmHouseRequirement,
    HasCookingUtensilRequirement,
    HealedCoralRequirement,
    IsAchievementCompletedRequirement,
    IsCutsceneTriggeredRequirement,
    IsGiantUnlockedRequirement,
    IsMailReadRequirement,
    Item,
    ItemInInventoryRequirement,
    ItemWithCategoryInInventoryRequirement,
    MailData,
    MarriageHasProposedRequirement,
    MasteryLevelRequirements,
    MountAcquiredRequirement,
    NpcHeartLevelRequirement,
    ObjectStateRequirement,
    QuestActiveRequirement,
    QuestFactComparators,
    QuestFactCompareRequirement,
    QuestFactRequirement,
    RemoveItemFromInventoryEffect,
    Requirement,
    RequirementEntry,
    SendMailToPlayerEffect,
    SetQuestActiveEffect,
    SetQuestCompletedEffect,
    SetQuestFactValueEffect,
    SpecialItem,
    SpecialItemRequirement,
    TempleLevelRequirement,
    UnlockCookingRecipeEffect,
    UnlockCookingUtensilEffect,
    UnlockCraftingRecipeEffect,
    UpdateNpcScheduleEffect,
    VaryMoneyEffect
} from "@ci/data-types";
import { getEnumValue, nonNullable } from "@ci/util";
import path from "path";
import fs from 'fs';
import { environment } from "../environments/environment";
import {
    GameplayRequirementsConfig,
    GameplayRequirementsConfigEntry,
    GameplayRequirementsConfigMap
} from "../interfaces/raw-data-interfaces/da-file-parse/requirements/gameplay-requirement-config.type";

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

    readAssets: Map<string, GameplayEffectsConfigEntry[] | GameplayRequirementsConfigEntry[]> = new Map<string, GameplayEffectsConfigEntry[] | GameplayRequirementsConfigEntry[]>();

    private changeObjectEffectsCustomNames: Map<string, string> = new Map<string, string>([
        ['ComCenLobbyPiano', 'Community Center Piano'],
        ['museum', 'Museum'],
    ])

    parse(filePath: string): EffectMap | RequirementMap | undefined {
        const fullPath = path.join(environment.assetPath, filePath)
        if (!this.readAssets.has(fullPath)) {

            if (fs.existsSync(fullPath)) {
                this.readAssets.set(fullPath, readAsset<GameplayEffectsConfigEntry[] | GameplayRequirementsConfigEntry[]>(filePath));
            } else {
                Logger.error(`Da-File does not exist ${fullPath}`)
            }
        }

        const readFile = this.readAssets.get(fullPath)!

        let mappingEntry: GameplayRequirementsConfig | GameplayEffectsConfig | undefined = readFile.find((a): a is GameplayEffectsConfig => a.Type === "C_GameplayEffectsConfig");

        if (mappingEntry) {
            return this.parseGameplayEffects(mappingEntry);
        }
        mappingEntry = readFile.find((a): a is GameplayRequirementsConfig => a.Type === "C_GameplayRequirementsConfig");

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

        let conf: GameplayEffectsConfigMap;

        if (Array.isArray(map)) {
            conf = map.reduce((previousValue, currentValue) => ({...previousValue, ...currentValue}), {})
        } else {
            conf = map
        }


        const keys = Object.keys(conf);

        keys.forEach(key => {

            const effects = conf[key].effects.map(effect => {

                const [daPath, index] = effect.ObjectPath.split('.');

                const daJson = daPath + '.json';
                const fullDaPath = path.join(environment.assetPath, daJson)
                if (!this.readAssets.has(fullDaPath)) {

                    // if (fs.existsSync(fullDaPath)) {
                    //     this.readAssets.set(fullDaPath, readAsset<(GameplayEffectsConfigEntry)[]>(daJson));
                    // } else {
                    //     Logger.error(`Da-File does not exist ${fullDaPath}`)
                    // }

                }

                const foundEffect = this.readAssets.get(fullDaPath)?.[+index];

                if (!foundEffect) {
                    Logger.error(`Didnt find ${key}.${index}`);
                    return
                }
                let daEffect: Effect | undefined = undefined;

                switch (foundEffect.Type) {
                    case "C_BoostMaxStaminaEffect": {

                        daEffect = {type: "BoostMaxStamina"} satisfies BoostMaxStaminaEffect;
                        break;
                    }
                    case "C_AddItemToInventoryEffect": {

                        const {itemData, ...rest} = foundEffect.Properties
                        const item = DaFilesParser.ItemMap.get(itemData.itemID)

                        if (!item) return;

                        daEffect = {
                            type: "AddItemToInventory",
                            meta: {
                                item: minifyItem(item),
                                ...rest
                            }
                        } satisfies AddItemToInventoryEffect;
                        break;
                    }
                    case "C_UnlockCookingUtelsilEffect": {
                        daEffect = {
                            type: "UnlockCookingUtensil",
                            meta: {
                                // TODO check if correct?
                                utensil: foundEffect.Properties?.utensilToUnlock ? getEnumValue(foundEffect.Properties.utensilToUnlock) : 'FryingPan'
                            }
                        } satisfies UnlockCookingUtensilEffect;
                        break;
                    }
                    case "C_SetQuestFactValueEffect": {

                        daEffect = {
                            type: "SetQuestFactValue",
                            meta: {
                                factName: foundEffect.Properties.fact.factName.RowName
                            }
                        } satisfies SetQuestFactValueEffect;
                        break;
                    }
                    case "C_UnlockCookingRecipeEffect": {

                        const item = recipes.find(r => r.cookingKey === foundEffect.Properties.recipe.RowName)?.item

                        if (!item) {
                            Logger.error(`DaFilesParser: Cant find recipe for ${foundEffect.Properties.recipe.RowName}`)
                            return;
                        }

                        daEffect = {
                            type: "UnlockCookingRecipe",
                            meta: {
                                item: minifyItem(item)
                            }
                        } satisfies UnlockCookingRecipeEffect;
                        break;
                    }
                    case "C_UnlockCraftingRecipeEffect": {

                        const item = DaFilesParser.ItemMap.get(foundEffect.Properties.recipe.RowName.toLowerCase())

                        if (!item) return;

                        daEffect = {
                            type: "UnlockCraftingRecipe",
                            meta: {
                                item: minifyItem(item)
                            }
                        } satisfies UnlockCraftingRecipeEffect;
                        break;


                    }
                    case "C_ConsumeItemMasteryEffect": {

                        daEffect = {
                            type: "ConsumeItemMastery",
                            meta: {
                                mastery: getEnumValue(foundEffect.Properties.masteryType)
                            }
                        } satisfies ConsumeMasteryItemEffect;
                        break;


                    }
                    case "C_VaryMoneyEffect": {

                        daEffect = {
                            type: "VaryMoney",
                            meta: {
                                amount: foundEffect.Properties.amount
                            }
                        } satisfies VaryMoneyEffect;
                        break;


                    }
                    case "C_ChangeObjectStateEffect": {

                        daEffect = {
                            type: "ChangeObjectState",
                            meta: {
                                id: foundEffect.Properties.id,
                                state: foundEffect.Properties.state
                            }
                        } satisfies ChangeObjectStateEffect;

                        const customName = this.changeObjectEffectsCustomNames.get(foundEffect.Properties.id);

                        if (customName) {
                            daEffect.meta['customName'] = customName
                        }
                        break;


                    }
                    case "C_UpdateNPCScheduleEffect": {

                        daEffect = {
                            type: "UpdateNpcSchedule",
                            meta: {
                                npcIds: foundEffect.Properties.npcIDs
                            }
                        } satisfies UpdateNpcScheduleEffect;

                        break;


                    }
                    case "C_SendMailToPlayerEffect": {
                        const mailId = foundEffect.Properties.mailId;
                        const mail = DaFilesParser.MailMap.get(mailId)

                        if (!mail) {
                            Logger.error(`DaFilesParser: Can't find mail with mailId ${mailId}`)
                            return;
                        }

                        daEffect = {
                            type: "SendMailToPlayer",
                            meta: {
                                mail: {
                                    mailId,
                                    title: mail.title ?? mailId
                                },
                                dayDelay: foundEffect.Properties.dayDelay
                            }
                        } satisfies SendMailToPlayerEffect;
                        break;


                    }
                    case "C_SetQuestActiveEffect": {

                        daEffect = {
                            type: "SetQuestActive",
                            meta: {
                                questId: foundEffect.Properties.questId
                            }
                        } satisfies SetQuestActiveEffect;
                        break;


                    }
                    case "C_SetQuestCompletedEffect": {

                        daEffect = {
                            type: "SetQuestCompleted",
                            meta: {
                                questId: foundEffect.Properties.questId
                            }
                        } satisfies SetQuestCompletedEffect;
                        break;


                    }

                    case "C_RemoveItemFromInventoryEffect": {

                        let meta: RemoveItemFromInventoryEffect['meta'];

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


                        daEffect = {
                            type: "RemoveItemFromInventory",
                            meta
                        } satisfies RemoveItemFromInventoryEffect;
                        break;


                    }

                    default: {
                        Logger.error(`Cannot find effect definition for ${foundEffect.Type} in ${fullDaPath}`)
                    }
                }

                return daEffect;

            }).filter(nonNullable)

            result.set(key, {key, effects})
        })

        return result
    }

    private parseGameplayRequirements(mappingEntry: GameplayRequirementsConfig): RequirementMap {
        const result: RequirementMap = new Map<string, RequirementEntry>
        const map = mappingEntry.Properties?.map;

        if (!map) return new Map()

        let conf: GameplayRequirementsConfigMap;

        if (Array.isArray(map)) {
            conf = map.reduce((previousValue, currentValue) => ({...previousValue, ...currentValue}), {})
        } else {
            conf = map
        }


        const keys = Object.keys(conf);

        keys.forEach(key => {


            const reqs = conf[key].requirements.map(effect => {


                if (!effect) return;

                const [daPath, index] = effect.ObjectPath.split('.');

                const daJson = daPath + '.json';
                const fullDaPath = path.join(environment.assetPath, daJson)
                if (!this.readAssets.has(fullDaPath)) {

                    // if (fs.existsSync(fullDaPath)) {
                    //     this.readAssets.set(fullDaPath, readAsset<(GameplayEffectsConfigEntry)[]>(daJson));
                    // } else {
                    //     Logger.error(`Da-File does not exist ${fullDaPath}`)
                    // }

                }

                const foundEffect = (this.readAssets.get(fullDaPath) as GameplayRequirementsConfigEntry[] | undefined)?.[+index];

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

                    case "C_EditorOnlyRequirement": {
                        daEffect = {
                            type: "EditorOnly",

                        } satisfies EditorOnlyRequirement;

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

            result.set(key, {key, type: getEnumValue(conf[key].type), requirements: reqs})

        })

        return result;
    }
}

