import { TranslationKey } from "../types/translation-key";

export interface SpecialItem {
    id: string;
    displayName: TranslationKey;
    description: TranslationKey;
    iconName: string | null;
}
