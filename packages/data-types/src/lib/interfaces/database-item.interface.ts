import { AnimalData } from './animal-data.interface';
import { BaseCrop } from './base-crop.interface';
import { Consumable } from './consumable.interface';
import { CookingRecipe } from './cooking-recipe.interface';
import { CraftingRecipe } from './crafting-recipe.interface';
import { Critter } from './critter.interface';
import { Enemy } from './enemy.interface';
import { FestivalShopItemData } from './festival-shop-item-data.interface';
import { Fish } from './fish.interface';
import { GiftingPreferenceKey } from '../types/gifting-preference-keys.type';
import { Item } from './item.interface';
import { ItemMixingRecipeData } from '../types/item-mixing-recipe-data.type';
import { ItemProcessing } from './item-processing.interface';
import { ItemProcessShopData } from './item-process-shop-data.interface';
import { ItemUpgradeData } from './item-upgrade-data.interface';
import { MinimalNPC } from '../types/minimal-npc.type';
import { OfferingAltar } from './offering-altar.interface';
import { Offerings } from './offerings.interface';
import { ShopItemData } from './shop-item-data.interface';
import { UiIcon } from "../enums/ui-icon.enum";

export interface DatabaseItem {
    item: Item;
    fish?: Omit<Fish, 'item'>;
    artisanResult?: ItemProcessing[];
    artisanIngredient?: ItemProcessing[];
    fromEnemies?: Enemy[]
    usedToCook?: CookingRecipe[];
    cookedFrom?: CookingRecipe[];
    usedToMix?: ItemMixingRecipeData[];
    mixedFrom?: ItemMixingRecipeData[];
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
