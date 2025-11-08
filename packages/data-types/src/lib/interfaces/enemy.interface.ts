import { ChancePerItem } from "./chance-per-item.interface";
import { TranslationKey } from "../types/translation-key";

export interface Enemy {
    key: string;
    displayName: TranslationKey,
    description: TranslationKey | null,
    iconName: string;
    image: string | null;
    dropRates: ChancePerItem[];
    experience: number;
}
