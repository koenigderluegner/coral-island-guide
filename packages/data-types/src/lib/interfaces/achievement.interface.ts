import { TranslationKey } from "../types/translation-key";

export interface Achievement {
    id: string;
    title: TranslationKey;
    description: TranslationKey;
    iconName: string;
}
