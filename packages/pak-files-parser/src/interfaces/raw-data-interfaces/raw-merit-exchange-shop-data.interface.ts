import { SourceString } from "../../types/source-string.type";
import { ItemDatatableRef } from "../../types/item-datatable-ref";
import { AssetPath } from "../../types/asset-path.type";

export interface RawMeritExchangeShopData {
    "isLimitedItem": boolean,
    "itemLimit": number,
    "isStaminaFruit": boolean,
    "isUsingCustomEffect": boolean,
    "isUnlockRecipe": boolean,
    "enable": boolean,
    "townRank": number,
    "item": ItemDatatableRef,
    "useCustomName": boolean,
    "shopItemName": SourceString,
    "useCustomIcon": boolean,
    "customIcon": AssetPath,
    "useCustomCategory": boolean,
    "customCategory": SourceString,
    "useCustomDescription": boolean,
    "customDescription": SourceString,
    "useCategory": boolean,
    "category": string;
    "priority": number,
    "priceOverride": number
    "tag": string[]
}
