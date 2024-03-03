import {
    AnimalData,
    BaseCrop,
    Consumable,
    CookingRecipe,
    CraftingRecipe,
    Critter,
    Enemy,
    FestivalShopItemData,
    Fish,
    GiftingPreferenceKey,
    Item,
    ItemProcessing,
    ItemProcessShopData,
    ItemUpgradeData,
    MinimalNPC,
    OfferingAltar,
    Offerings,
    ShopItemData
} from "@ci/data-types";
import { UiIcon } from "../enums/ui-icon.enum";

export interface DatabaseItem {
    item: Item;
    fish?: Omit<Fish, 'item'>;
    artisanResult?: ItemProcessing[];
    artisanIngredient?: ItemProcessing[];
    fromEnemies?: Enemy[]
    usedToCook?: CookingRecipe[];
    cookedFrom?: CookingRecipe[]
    craftedFrom?: CraftingRecipe[]
    usedToCraft?: CraftingRecipe[]
    isSeedFor?: BaseCrop[];
    comesFromSeed?: BaseCrop[];
    buyAtFestivalShop?: (FestivalShopItemData & {
        festival: { url: string; displayName: string }
    })[];
    asGift?: { pref: { icon: UiIcon, label: string, preferenceField: GiftingPreferenceKey }, npcs: MinimalNPC[] }[];
    insect?: Critter;
    oceanCritter?: Critter;
    isUpgradeResult?: (ItemUpgradeData & {
        shop: {
            url: string;
            displayName: string
        }
    })[],
    isUpgradeRequirement?: (ItemUpgradeData & {
        shop: {
            url: string;
            displayName: string
        }
    })[],
    requiredAsOffering?: (OfferingAltar & { offerings: Offerings[] })[];
    isBundleRewardIn?: (OfferingAltar & { offerings: Offerings[] })[];
    buyAt?: (ShopItemData & {
        shop: { url: string; displayName: string }
    })[];
    chanceAsProcessResult?: (ItemProcessShopData & {
        shop: {
            url: string;
            displayName: string
        }
    })[]
    asProcessInput?: (ItemProcessShopData & {
        shop: {
            url: string;
            displayName: string
        }
    })[]
    consumables?: {
        base?: Consumable;
        bronze?: Consumable;
        silver?: Consumable;
        gold?: Consumable;
        osmium?: Consumable;
    }
    producedByAnimal?: AnimalData & { displayName?: string; },
    enchantmentPoints?: number;
}
