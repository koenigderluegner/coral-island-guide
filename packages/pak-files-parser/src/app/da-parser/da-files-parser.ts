import { minifyItem, readAsset, unifyInternalPath } from "../../util/functions";
import {
    GameplayEffectsConfig,
    GameplayEffectsConfigEntry,
    GameplayEffectsConfigMap
} from "../../types/offering-reward-config.type";
import { Logger } from "../../util/logger.class";
import {
    Achievement,
    CookingRecipe,
    Effect,
    EffectMetaForType,
    Item,
    MailData,
    QuestFactComparator,
    QuestFactComparators,
    Requirement,
    RequirementEntry,
    RequirementMetaForType,
    SpecialItem,
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
import { convertRequirementWithMeta } from "../../interfaces/raw-data-interfaces/da-file-parse/requirements/raw-requirement-with-meta";
import { convertRequirementWithoutMeta } from "../../interfaces/raw-data-interfaces/da-file-parse/requirements/raw-requirement-without-meta";

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
                        const meta: EffectMetaForType<'ChangeObjectState'> = {
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

                        let meta: EffectMetaForType<'RemoveItemFromInventory'>;

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


            const reqs = key.Value.requirements.map(requirement => {


                if (!requirement) return;

                const [daPath, index] = requirement.ObjectPath.split('.');

                const daJson = unifyInternalPath(daPath + '.json');
                const fullDaPath = unifyInternalPath(path.join(environment.assetPath, daJson));
                if (!DaFilesParser.readAssets.has(fullDaPath)) {

                    // if (fs.existsSync(fullDaPath)) {
                    //     this.readAssets.set(fullDaPath, readAsset<(GameplayEffectsConfigEntry)[]>(daJson));
                    // } else {
                    //     Logger.error(`Da-File does not exist ${fullDaPath}`)
                    // }

                }

                const foundRequirement = (DaFilesParser.readAssets.get(fullDaPath) as GameplayRequirementsConfigEntry[] | undefined)?.[+index];

                if (!foundRequirement) {
                    Logger.error(`Didnt find ${key}.${index}`);
                    return
                }

                let daEffect: Requirement | undefined = undefined;

                switch (foundRequirement.Type) {
                    case "C_IsMailReadRequirement":
                        const mailId = foundRequirement.Properties.mailId;
                        const mail = DaFilesParser.MailMap.get(mailId)

                        if (!mail) {
                            Logger.error(`DaFilesParser: Can't find mail with mailId ${mailId}`)
                            return;
                        }

                        daEffect = convertRequirementWithMeta(foundRequirement, () => (
                            {
                                mailId,
                                title: mail.title ?? mailId
                            }
                        ))
                        break;
                    case "C_CountNPCHeartLevelRequirement": {
                        daEffect = convertRequirementWithMeta(foundRequirement, (p) => ({
                                expectedHeartLevel: p.expectedHeartLevel
                            })
                        );
                        break;
                    }
                    case "C_DinoHologramItemRewardClaimed": {
                        daEffect = convertRequirementWithMeta({
                            ...foundRequirement,
                            Type: 'C_DinoHologramItemRewardClaimedRequirement',
                            Class: `UScriptClass'C_DinoHologramItemRewardClaimedRequirement'`
                        }, (p) => (
                            {
                                dinosaursName: p.dinoHologram.dinosaursName.RowName
                            }
                        ));
                        break;
                    }
                    case "C_NPCHeartLevelRequirement": {
                        daEffect = convertRequirementWithMeta(foundRequirement, (p) => (
                            {
                                expectedHeartLevel: p.expectedHeartLevel,
                                npcKey: p.NPCId
                            }
                        ))
                        break;
                    }
                    case "C_TimeDateRequirement": {
                        daEffect = convertRequirementWithMeta(foundRequirement, (p) => (
                            {
                                inverted: p.invertResult,
                                clampDateRange: p.clampDateRange,
                                conditionType: getEnumValue(p.conditionType),
                                dateRange: {
                                    isValidIndefinitelyOnceStarted: p.dateRange.isValidIndefinitelyOnceStarted,
                                    isValidOnSpecificDate: p.dateRange.isValidOnSpecificDate,
                                    startsFrom: {
                                        day: p.dateRange.startsFrom.day ?? 1,
                                        season: getEnumValue(p.dateRange.startsFrom.season),
                                        year: p.dateRange.startsFrom.year ?? 1,

                                    },
                                    lastsTill: {
                                        day: p.dateRange.lastsTill.day ?? 1,
                                        season: getEnumValue(p.dateRange.lastsTill.season),
                                        year: p.dateRange.lastsTill.year ?? 1,

                                    }
                                }
                            }
                        ));
                        break;
                    }
                    case "C_DateSeasonRequirement": {
                        daEffect = convertRequirementWithMeta(foundRequirement, (p) => (
                            {
                                day: p.expectedDateSeason.day,
                                season: getEnumValue(p.expectedDateSeason.season)
                            }
                        ))
                        break;
                    }
                    case "C_IsMultiplayerRequirement":
                    case "C_EditorOnlyRequirement": {
                        daEffect = convertRequirementWithoutMeta(foundRequirement)
                        break;
                    }


                    case "C_IsAchievementCompletedRequirement": {

                        const achievement = DaFilesParser.AchievementMap.get(foundRequirement.Properties.achievementId)

                        if (!achievement) return;


                        daEffect = convertRequirementWithMeta(foundRequirement, (p) => (
                            {
                                achievement
                            }
                        ))
                        break;
                    }
                    case "C_IsCutsceneTriggeredRequirement": {
                        daEffect = convertRequirementWithMeta(foundRequirement, (p) => (
                            {
                                cutsceneTopic: p.cutsceneTopic
                            }
                        ))
                        break;
                    }

                    case "C_IsGiantUnlockedRequirement": {
                        daEffect = convertRequirementWithMeta(foundRequirement, (p) => (
                            {
                                types: p.types
                            }
                        ))
                        break;
                    }


                    case "C_MarriageHasProposedRequirement": {
                        daEffect = convertRequirementWithMeta(foundRequirement, (p) => (
                            {
                                inverted: p?.invertResult
                            }
                        ))
                        break;
                    }


                    case "C_MountAcquiredRequirement": {
                        daEffect = convertRequirementWithMeta(foundRequirement, (p) => (
                            {
                                inverted: p?.invertResult
                            }
                        ))
                        break;
                    }

                    case "C_HasCookingUtensilReuirement": {
                        daEffect = convertRequirementWithMeta({
                            ...foundRequirement,
                            Type: 'C_HasCookingUtensilRequirement',
                            Class: `UScriptClass'C_HasCookingUtensilRequirement'`
                        }, (p) => (
                            {
                                utensil: p.requiredUtensil ? getEnumValue(p.requiredUtensil) : undefined,
                                inverted: p.invertResult
                            }
                        ))
                        break;
                    }


                    case "C_QuestFactRequirement": {
                        daEffect = convertRequirementWithMeta(foundRequirement, (p) => (
                            {
                                factName: p.fact.factName.RowName
                            }
                        ))
                        break;
                    }

                    case "C_QuestFactCompareRequirement": {
                        const comparator: QuestFactComparator = getEnumValue(foundRequirement.Properties.factCompare.compareType);
                        if (!QuestFactComparators.includes(comparator)) {
                            Logger.error(`Unknown comparator for quest fact compare: ${comparator}`)
                            return;
                        }
                        daEffect = convertRequirementWithMeta(foundRequirement, (p) => (
                            {
                                factName: p.fact.factName.RowName,
                                comparator,
                                value: p.factCompare.comparedInteger
                            }
                        ))
                        break;
                    }

                    case "C_ObjectStateRequirement": {
                        const meta: RequirementMetaForType<'ObjectState'> = {
                            id: foundRequirement.Properties.id,
                            state: foundRequirement.Properties.requiredState
                        }
                        const customName = this.changeObjectEffectsCustomNames.get(foundRequirement.Properties.id);

                        if (customName) {
                            meta['customName'] = customName
                        }

                        daEffect = convertRequirementWithMeta(foundRequirement, (p) => meta)


                        break;


                    }
                    case "C_HealedCoralRequirement": {

                        daEffect = convertRequirementWithMeta(foundRequirement, (p) => (
                            {
                                required: p.required,
                            }
                        ))

                        break;
                    }


                    case "C_TempleLevelRequirement": {
                        daEffect = convertRequirementWithMeta(foundRequirement, (p) => (
                            {
                                level: p.requiredLevel
                            }
                        ))
                        break;
                    }
                    case "C_MasteryLevelRequirement": {
                        daEffect = convertRequirementWithMeta(foundRequirement, (p) => (
                            {
                                level: p.expectedMasteryLevel,
                                mastery: getEnumValue(p.masteryType)
                            }
                        ))
                        break;
                    }
                    case "C_CompleteMiningRequirement": {
                        daEffect = convertRequirementWithMeta(foundRequirement, (p) => (
                            {
                                level: p.requiredLevel,
                                mine: p.miningTheme ? getEnumValue(p.miningTheme) : 'Earth'
                            }
                        ))
                        break;
                    }
                    case "C_FarmHouseRequirement": {
                        daEffect = convertRequirementWithMeta(foundRequirement, (p) => (
                            {
                                level: p.requiredLevel
                            }
                        ))
                        break;
                    }

                    case "C_QuestActiveRequirement": {
                        daEffect = convertRequirementWithMeta(foundRequirement, (p) => (
                            {
                                questId: p.questId
                            }
                        ))
                        break;
                    }


                    case "C_SpecialItemRequirement": {

                        const item = DaFilesParser.SpecialItemMap.get(foundRequirement.Properties.item.RowName)

                        if (!item) return;


                        daEffect = convertRequirementWithMeta(foundRequirement, (p) => (
                            {
                                item: minifyItem(item)
                            }
                        ))
                        break;
                    }

                    case "C_ItemInInventoryRequirement": {

                        const item = DaFilesParser.ItemMap.get(foundRequirement.Properties.inventoryItem.itemID)

                        if (!item) return;

                        const meta: RequirementMetaForType<'ItemInInventory'> = {
                            item: minifyItem(item),
                            amount: foundRequirement.Properties.expectedAmount ?? 1,
                        }

                        if (foundRequirement.Properties.qualityRequirement) {
                            meta.requiredQuality = getEnumValue(foundRequirement.Properties.qualityRequirement.rules)
                        }

                        daEffect = convertRequirementWithMeta(foundRequirement, (p) => meta)
                        break;
                    }

                    case "C_ItemWithCategoryInInventoryRequirement": {

                        daEffect = convertRequirementWithMeta(foundRequirement, (p) => (
                            {
                                categoryName: foundRequirement.Properties.category.data.RowName,
                                amount: foundRequirement.Properties.expectedAmount ?? 1,
                            }
                        ))

                        break;
                    }
                    case "C_DateSeasonRangeRequirement": {

                        daEffect = convertRequirementWithMeta(foundRequirement, (p) => (
                            {
                                inverted: foundRequirement.Properties.invertResult,
                                from: {
                                    day: foundRequirement.Properties.expectedDateSeason.from.day,
                                    season: getEnumValue(foundRequirement.Properties.expectedDateSeason.from.season),
                                    year: -1
                                },
                                to: {
                                    day: foundRequirement.Properties.expectedDateSeason.to.day,
                                    season: getEnumValue(foundRequirement.Properties.expectedDateSeason.to.season),
                                    year: -1
                                }
                            }
                        ))
                        break;
                    }

                    default: {
                        Logger.error(`Cannot find requirement definition for ${foundRequirement.Type} in ${fullDaPath}`)
                    }

                }


                return daEffect;

            }).filter(nonNullable)

            result.set(key.Key, {key: key.Key, type: getEnumValue(key.Value.type), requirements: reqs})

        })

        return result;
    }
}

