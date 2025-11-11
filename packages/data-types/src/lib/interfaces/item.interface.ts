import { TranslationKey } from "../types/translation-key";
import { InterpolationParameters } from "@ngx-translate/core";

export interface Item {
    id: string;
    displayName: TranslationKey;
    price: number;
    sellPrice: number;
    sellAt: string[];
    stackable: boolean
    inventoryCategory: TranslationKey;
    displayKey: string;
    description: TranslationKey;
    qualities: {
        bronze?: QualityPrices;
        silver?: QualityPrices;
        gold?: QualityPrices;
        osmium?: QualityPrices;
        [key: string]: QualityPrices | undefined;
    },
    tags?: string[];
    iconName: string | null;
    translateParams?: InterpolationParameters;
}

interface QualityPrices {
    price: number;
    sellPrice: number;
}
