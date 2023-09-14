import { MinimalItem } from "../types/minimal-item.type";
import { Item } from "./item.interface";
import { Effect } from "../types/effects/effect.type";
import { RequirementEntry } from "../types/requirement-entry.type";

export interface MeritExchangeShopData {
    "isLimitedItem": boolean,
    "itemLimit": number,
    "enable": boolean,
    "townRank": number,
    item: MinimalItem & Pick<Item, 'price' | 'sellPrice'>;
    "priceOverride": number;
    effects?: Effect[],
    requirements?: RequirementEntry
}
