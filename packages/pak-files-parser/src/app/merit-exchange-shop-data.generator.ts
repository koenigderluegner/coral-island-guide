import { BaseGenerator } from "./base-generator.class";
import { Effect, Item, MeritExchangeShopData, RequirementEntry } from "@ci/data-types";
import { minifyItem, readAsset } from "../util/functions";
import { Datatable } from "../interfaces/datatable.interface";
import { RawMeritExchangeShopData } from "../interfaces/raw-data-interfaces/raw-merit-exchange-shop-data.interface";


export class MeritExchangeShopDataGenerator extends BaseGenerator<RawMeritExchangeShopData, MeritExchangeShopData> {

    datatable: Datatable<RawMeritExchangeShopData>[];

    constructor(protected itemMap: Map<string, Item>, datatablePath: string) {
        super();
        this.datatable = readAsset<Datatable<RawMeritExchangeShopData>[]>(datatablePath);
    }

    handleEntry(itemKey: string, dbItem: RawMeritExchangeShopData): MeritExchangeShopData | undefined {


        const foundItem = this.itemMap.get(dbItem.item.itemID);

        if (!foundItem) return;

        const item: MeritExchangeShopData['item'] = {
            ...minifyItem(foundItem),
            price: foundItem.price,
            sellPrice: foundItem.sellPrice
        };

        const effectsAndRequirements: { effects?: Effect[], requirements?: RequirementEntry } = {}

        const requirements = this.getRequirements(dbItem.item.itemID);

        if (requirements && requirements.requirements.length) {
            effectsAndRequirements.requirements = requirements
        }
        const effects = this.getEffects(dbItem.item.itemID);

        if (dbItem.isStaminaFruit && !effects?.find(a => a.type === "BoostMaxStamina")) {
            effects?.push({type: "BoostMaxStamina"})
        }

        if (dbItem.isUnlockRecipe && !effects?.find(a => a.type === "UnlockCookingRecipe")) {
            effects?.push({
                type: "UnlockCraftingRecipe", meta: {
                    item: minifyItem(item)
                }
            })
        }

        if (effects && effects.length) {
            effectsAndRequirements.effects = effects
        }


        return {
            item,
            townRank: dbItem.townRank,
            priceOverride: dbItem.priceOverride,
            enable: dbItem.enable,
            isLimitedItem: dbItem.isLimitedItem,
            itemLimit: dbItem.itemLimit,
            ...effectsAndRequirements
        };
    }

}
