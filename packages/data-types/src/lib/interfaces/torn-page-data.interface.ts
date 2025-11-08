import { TranslationKey } from "../types/translation-key";

export interface TornPageData {
    key: string;
    title: TranslationKey | null,
    content: TranslationKey,
    pageType: string | null
}
