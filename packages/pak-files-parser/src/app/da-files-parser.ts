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
    Effect,
    Item,
    SetQuestFactValueEffect,
    UnlockCookingRecipeEffect,
    UnlockCookingUtensilEffect,
    UnlockCraftingRecipeEffect
} from "@ci/data-types";
import { getEnumValue } from "@ci/util";
import path from "path";
import fs from 'fs';
import { environment } from "../environments/environment";
import { GameplayRequirementsConfigEntry } from "../interfaces/raw-data-interfaces/da-file-parse/requirements/gameplay-requirement-config.type";

export class DaFilesParser {

    readAssets: Map<string, GameplayEffectsConfigEntry[] | GameplayRequirementsConfigEntry[]> = new Map<string, GameplayEffectsConfigEntry[] | GameplayRequirementsConfigEntry[]>()

    constructor(protected itemMap: Map<string, Item>) {
        this.parse('ProjectCoral/Content/ProjectCoral/Data/Offering/DA_OfferingReward.json');
        this.parse('ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DA_ConcernedMonkeyBuyEffect.json');
        this.parse('ProjectCoral/Content/ProjectCoral/Core/Data/Shops/CraftShop/DA_CraftingShopEffect.json');
    }

    parse(filePath: string) {
        const fullPath = path.join(environment.assetPath, filePath)
        if (!this.readAssets.has(fullPath)) {

            if (fs.existsSync(fullPath)) {
                this.readAssets.set(fullPath, readAsset<GameplayEffectsConfigEntry[] | GameplayRequirementsConfigEntry[]>(filePath));
            } else {
                Logger.error(`Da-File does not exist ${fullPath}`)
            }
        }

        const readFile = this.readAssets.get(fullPath)!

        let mappingEntry: GameplayRequirementsConfigEntry | GameplayEffectsConfig | undefined = readFile.find((a): a is GameplayEffectsConfig => a.Type === "C_GameplayEffectsConfig");

        if (mappingEntry) {
            this.parseGameplayEffects(mappingEntry);
        }
        mappingEntry = readFile.find((a): a is GameplayRequirementsConfigEntry => a.Type === "C_GameplayEffectsConfig");

        if (mappingEntry) {
            this.parseGameplayEffects(mappingEntry);
        }

    }


    private parseGameplayEffects(mappingEntry: GameplayEffectsConfig) {
        const map = mappingEntry.Properties.map;


        let conf: GameplayEffectsConfigMap;

        if (Array.isArray(map)) {
            conf = map.reduce((previousValue, currentValue) => ({...previousValue, ...currentValue}), {})
        } else {
            conf = map
        }
        // console.log(conf)

        const keys = Object.keys(conf);

        keys.forEach(key => {

            conf[key].effects.map(effect => {

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

                console.log(daEffect)


            })


        })
    }
}
