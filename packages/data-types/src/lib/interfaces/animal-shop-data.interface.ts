import { RequirementEntry } from '../types/requirement-entry.type';
import { TranslationKey } from "../types/translation-key";

export interface AnimalShopData {
    key: string;
    price: number,
    sellPrice: number,
    amountOnPurchase: number,
    townRank: number,
    itemLimit: number,
    animalKey: string | null,
    isAdult: boolean,
    description: TranslationKey | null,
    readableCategory: TranslationKey | null,
    readableRequirement: TranslationKey | null,
    readableName: TranslationKey | null,
    requirements?: RequirementEntry
}
