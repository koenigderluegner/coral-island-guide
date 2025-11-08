import { MinimalItem } from "../types/minimal-item.type";
import { TranslationKey } from "../types/translation-key";

export interface TagBasedItem {
    key: string;
    tags: string[];
    iconName: string;
    displayName: TranslationKey;
    items: MinimalItem[]
}
