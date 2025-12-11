import { TranslationKey } from './translation-key';

export type TownRankPoints = {
    enabled: boolean,
    point: number,
    category: string,
    description: TranslationKey | null
}
