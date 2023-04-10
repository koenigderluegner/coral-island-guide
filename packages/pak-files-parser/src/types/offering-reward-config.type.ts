export type OfferingRewardConfigStaminaFruit = {
    "Type": "C_BoostMaxStaminaEffect",
    "Name": string;
    "Outer": "DA_OfferingReward"
};

export type OfferingRewardConfigAddItem = {
    "Type": "C_AddItemToInventoryEffect",
    "Name": string;
    "Outer": "DA_OfferingReward",
    "Properties": {
        "itemData": {
            "data": {
                "RowName": string;
            },
            "itemID": string;
        },
        "quantity"?: number,
        "isQuestReward"?: boolean
    }
};


export type OfferingRewardConfigCookingRecipe = {
    "Type": "C_UnlockCookingRecipeEffect",
    "Name": string;
    "Outer": "DA_OfferingReward",
    "Properties": {
        "recipe": {
            "RowName": string;
        }
    }
}


export type OfferingRewardsConfigEffects = {
    "Type": "C_GameplayEffectsConfig",
    "Name": "DA_OfferingReward",
    "Properties": {
        "map": Record<string, {
            "effects": {
                "ObjectName": string;
                "ObjectPath": string;
            }            []
        }>
    }
}

export type OfferingRewardConfig =
    OfferingRewardConfigStaminaFruit
    | OfferingRewardsConfigEffects
    | OfferingRewardConfigCookingRecipe
    | OfferingRewardConfigAddItem
