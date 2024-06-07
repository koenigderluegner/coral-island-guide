import { ShopItemDataGenerator } from "./shops-and-festivals/shop-item-data.generator";
import { BaseOpeningHoursGenerator } from "../opening-hours-generators/base-opening-hours.generator";
import { AnimalShopDataGenerator } from "./shops-and-festivals/animal-shop-data.generator";
import { TreasureHuntGenerator } from "./journal/treasure-hunt.generator";
import { JournalOrderDbGenerator } from "./journal/journal-order-db.generator";
import { GeneratorList } from "./generator-list.type";
import { Item, TagBasedItem } from "@ci/data-types";
import { ItemMixingRecipeDataDbGenerator } from "./item-mixing-recipe-data/item-mixing-recipe-data-db.generator";

export const getBetaGenerators = (itemDbMap: Map<string, Item>, tagBasedItemsDbMap: Map<string, TagBasedItem>) => ({
    'underwater-seeds-item-mixing-data': new ItemMixingRecipeDataDbGenerator('ProjectCoral/Content/ProjectCoral/Data/ItemMixing/DT_ItemMixingRecipes.json', itemDbMap, tagBasedItemsDbMap),
    'taco-truck-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_TacoTruck.json'),

    'sales-cart-stall-indoor-shop-items': {
        generate: () => new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_ShopUnderWaterFurnitureIndoor.json').generate({
            daFiles: [
                'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/Furniture/DA_UnderWaterFurnitureShopBuyEffect.json',

            ]
        })
    },
    'sales-cart-stall-outdoor-shop-items': {
        generate: () => new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_ShopUnderWaterFurnitureOutdoor.json').generate({
            daFiles: [
                'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/Furniture/DA_UnderWaterFurnitureShopBuyEffect.json',

            ]
        })
    },
    'sales-cart-stall-opening-hours': new BaseOpeningHoursGenerator({'Building': 'ProjectCoral/Content/ProjectCoral/Data/OpeningHours/UnderWaterFurnitureHours.json'}),

    'tidal-threads-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/TidalThreads/DT_TidalThreadsClothShop.json'),
    'tidal-threads-opening-hours': new BaseOpeningHoursGenerator({'Building': 'ProjectCoral/Content/ProjectCoral/Data/OpeningHours/TidalThreadsHours.json'}),


    'underwater-ranch-opening-hours': new BaseOpeningHoursGenerator({'Building': 'ProjectCoral/Content/ProjectCoral/Data/OpeningHours/UnderWaterRanchHours.json'}),
    'underwater-ranch-animal-shop-data': {
        generate: () => new AnimalShopDataGenerator(`ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_AnimalUnderwaterShop.json`).generate({
            daFiles: [
                'ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DA_AnimalUnderwaterShopAdvanceRequirement.json',

            ]
        })
    },
    'treasure-hunt-maps': new TreasureHuntGenerator(itemDbMap),
    'journal-ocean-products': new JournalOrderDbGenerator('Produce/DT_JournalOcean.json'),

    'ramen-shop-shop-items': new ShopItemDataGenerator(itemDbMap, 'ProjectCoral/Content/ProjectCoral/Core/Data/Shops//DT_RamenShop.json'),
    'ramen-shop-opening-hours': new BaseOpeningHoursGenerator({'Building': 'ProjectCoral/Content/ProjectCoral/Data/OpeningHours/RamenShops.json'}),

} as const satisfies GeneratorList)
