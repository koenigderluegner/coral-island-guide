import { minifyItem, readAsset } from "../util/functions";
import {
    GameplayEffectsConfig,
    GameplayEffectsConfigEntry,
    GameplayEffectsConfigMap
} from "../types/offering-reward-config.type";
import { Logger } from "../util/logger.class";
import {
    AddItemToInventoryEffect,
    BoostMaxStaminaEffect,
    CountNpcHeartLevelRequirement,
    EditorOnlyRequirement,
    Effect,
    IsAchievementCompletedRequirement,
    IsCutsceneTriggeredRequirement,
    IsGiantUnlockedRequirement,
    Item,
    MarriageHasProposedRequirement,
    MinimalItem,
    MountAcquiredRequirement,
    QuestFactRequirement,
    Requirement,
    SetQuestFactValueEffect,
    SpecialItemRequirement,
    UnlockCookingRecipeEffect,
    UnlockCookingUtensilEffect,
    UnlockCraftingRecipeEffect
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

export type RequirementEntry = {
    key: string,
    type: string,
    requirements: Requirement[]
};
export type RequirementMap = Map<string, RequirementEntry>;

export class DaFilesParser {

    readAssets: Map<string, GameplayEffectsConfigEntry[] | GameplayRequirementsConfigEntry[]> = new Map<string, GameplayEffectsConfigEntry[] | GameplayRequirementsConfigEntry[]>()

    constructor(protected itemMap: Map<string, Item>) {
    }

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
                        const item = this.itemMap.get(itemData.itemID)

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
                                utensil: getEnumValue(foundEffect.Properties.utensilToUnlock)
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

                        const item = this.itemMap.get(foundEffect.Properties.recipe.RowName)

                        if (!item) return;

                        daEffect = {
                            type: "UnlockCookingRecipe",
                            meta: {
                                item: minifyItem(item)
                            }
                        } satisfies UnlockCookingRecipeEffect;
                        break;
                    }
                    case "C_UnlockCraftingRecipeEffect": {

                        const item = this.itemMap.get(foundEffect.Properties.recipe.RowName)

                        if (!item) return;

                        daEffect = {
                            type: "UnlockCraftingRecipe", meta: {
                                item: minifyItem(item)
                            }
                        } satisfies UnlockCraftingRecipeEffect;
                        break;
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
        const map = mappingEntry.Properties.map;


        let conf: GameplayRequirementsConfigMap;

        if (Array.isArray(map)) {
            conf = map.reduce((previousValue, currentValue) => ({...previousValue, ...currentValue}), {})
        } else {
            conf = map
        }


        const keys = Object.keys(conf);

        keys.forEach(key => {


            const reqs = conf[key].requirements.map(effect => {

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
                    case "C_CountNPCHeartLevelRequirement": {
                        daEffect = {
                            type: "CountNPCHeartLevel",
                            meta: {
                                expectedHeartLevel: foundEffect.Properties.expectedHeartLevel
                            }
                        } satisfies CountNpcHeartLevelRequirement;
                        break;
                    }

                    case "C_EditorOnlyRequirement": {
                        daEffect = {
                            type: "EditorOnly",

                        } satisfies EditorOnlyRequirement;

                        break;
                    }

                    case "C_IsAchievementCompletedRequirement": {
                        daEffect = {
                            type: "IsAchievementCompleted",
                            meta: {
                                achievementId: foundEffect.Properties.achievementId
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
                            meta: {}

                        } satisfies MountAcquiredRequirement;
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


                    case "C_SpecialItemRequirement": {
                        daEffect = {
                            type: "SpecialItem",
                            meta: {
                                item: foundEffect.Properties.item.RowName as unknown as MinimalItem
                            }
                        } satisfies SpecialItemRequirement;
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

