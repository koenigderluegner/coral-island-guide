import { Effect } from "../types/effects/effect.type";
import { TranslationKey } from "../types/translation-key";

export interface MailData {
    key: string;
    sender: TranslationKey | null,
    title: TranslationKey | null,
    content: TranslationKey,
    greetOpenMessage: TranslationKey | null,
    greetCloseMessage: TranslationKey | null,
    mailType: string | null
    tags: string[],

    isImportant: boolean;
    effects?: Effect[]
}
