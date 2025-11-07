import { RequirementEntry } from '../types/requirement-entry.type';

export interface AnimalShopData {
    key: string;
    price: number,
    sellPrice: number,
    amountOnPurchase: number,
    townRank: number,
    itemLimit: number,
    animalKey: string | null,
    isAdult: boolean,
    description: string | null,
    readableCategory: string | null,
    readableRequirement: string | null,
    readableName: string | null,
    requirements?: RequirementEntry
}
