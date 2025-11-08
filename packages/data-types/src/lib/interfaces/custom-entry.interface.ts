import { TranslationKey } from "../types/translation-key";

export interface CustomEntry {
    id: string;
    displayName: TranslationKey;
    iconName: string
    description: TranslationKey | null
    displayKey: TranslationKey | null
}
