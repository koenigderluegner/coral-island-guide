import { BaseGenerator } from "./base-generator.class";
import { CookingRecipe, Item, OfferingReward } from "@ci/data-types";
import { Datatable } from "../interfaces/datatable.interface";
import { minifyItem, readAsset } from "../util/functions";
import { RawOfferingReward } from "../interfaces/raw-offering-reward.interface";
import {
    OfferingRewardConfig,
    OfferingRewardConfigAddItem,
    OfferingRewardConfigCookingRecipe,
    OfferingRewardsConfigEffects
} from "../types/offering-reward-config.type";
import { OfferingMatch } from "../interfaces/offering-match.interface";

export class OfferingRewardsDbGenerator extends BaseGenerator<RawOfferingReward, OfferingMatch> {

    datatable: Datatable<RawOfferingReward>[] = readAsset<Datatable<RawOfferingReward>[]>('ProjectCoral/Content/ProjectCoral/Data/Offering/DT_OfferingRewardRegistry.json');
    private rewardsDa: OfferingRewardConfig[];
    private rewardsConfig: OfferingRewardsConfigEffects;
    private cookingrecipes: CookingRecipe[];

    constructor(protected itemMap: Map<string, Item>, protected cookingMap: Map<string, Record<string, CookingRecipe[]>>) {
        super();

        this.rewardsDa = readAsset<OfferingRewardConfig[]>('ProjectCoral/Content/ProjectCoral/Data/Offering/DA_OfferingReward.json');

        this.rewardsConfig = this.rewardsDa.find(a => a.Type === "C_GameplayEffectsConfig") as OfferingRewardsConfigEffects;

        const utensilRecipes = [...this.cookingMap.values()][0];
        this.cookingrecipes = []
        Object.keys(utensilRecipes).forEach(utensil => this.cookingrecipes.push(...utensilRecipes[utensil]))


    }

    handleEntry(itemKey: string, dbItem: RawOfferingReward): OfferingMatch {

        const rewards: OfferingReward = {items: [], recipes: []}

        const map = this.rewardsConfig.Properties.map;

        let conf;

        if (Array.isArray(map)) {
            const offeringRewardsConfigEffectsMaps = map.find(entry => Object.keys(entry).includes(dbItem.rewardID));
            conf = offeringRewardsConfigEffectsMaps?.[dbItem.rewardID]?.effects
        } else {
            conf = map[dbItem.rewardID]?.effects
        }

        if (!conf) console.log('no reward conf for ', dbItem.rewardID)
        if (conf) {
            conf.forEach(effect => {
                let key = effect.ObjectName.split(':')[1];

                // need to trim ' as they changed their syntax using ' instead of whitespaces
                key = key.replace(/^\'+/, '').replace(/\'+$/, '');
                const reward = this.rewardsDa.find(a => a.Name === key) as OfferingRewardConfigCookingRecipe | OfferingRewardConfigAddItem;

                if ('itemData' in reward.Properties) {
                    const item = this.itemMap.get(reward.Properties.itemData.itemID);
                    if (!item) {
                        console.log('cant find item reward for key ', reward.Properties.itemData.itemID)
                        return;
                    }
                    rewards.items.push({item: minifyItem(item), amount: reward.Properties.quantity ?? 1})
                } else if ('recipe' in reward.Properties) {
                    const cookingKey = reward.Properties.recipe.RowName
                    const recipe = this.cookingrecipes.find(cookingrecipe => cookingrecipe.cookingKey === cookingKey);
                    if (!recipe) {
                        console.log('cant find cooking reward for key ', cookingKey)
                        return;
                    }
                    rewards.recipes.push({item: minifyItem(recipe.item!), cookingKey})
                }
            })
        }


        if (!rewards.items.find(item => item.item.id === dbItem.rewardItem.itemID)) {
            const rewardItem = this.itemMap.get(dbItem.rewardItem.itemID);
            if (rewardItem) rewards.items.push({item: minifyItem(rewardItem), amount: 1});
        }

        return {
            key: itemKey,
            offeringId: dbItem.offeringId.RowName,
            rewardID: dbItem.rewardID,
            rewardItem: dbItem.rewardItem.itemID,
            rewards
        };

    }


}
