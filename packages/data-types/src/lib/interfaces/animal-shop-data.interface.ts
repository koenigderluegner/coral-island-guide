import { RequirementEntry } from "@ci/data-types";

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
