import { GiftPreference } from '../types/gift-preference.type';

export interface GiftPreferences {
    favoritePreferences: GiftPreference[],
    lovePreferences: GiftPreference[],
    likePreferences: GiftPreference[],
    neutralPreferences: GiftPreference[],
    dislikePreferences: GiftPreference[],
    hatePreferences: GiftPreference[],

    [key: string]: GiftPreference[]
}