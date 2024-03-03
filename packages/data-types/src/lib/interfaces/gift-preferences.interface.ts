import { GiftPreference } from '../types/gift-preference.type';
import { MinimalNPC } from "../types/minimal-npc.type";

export interface GiftPreferences {
    npc?: MinimalNPC;
    favoritePreferences: GiftPreference[],
    lovePreferences: GiftPreference[],
    likePreferences: GiftPreference[],
    neutralPreferences: GiftPreference[],
    dislikePreferences: GiftPreference[],
    hatePreferences: GiftPreference[],

    [key: string]: GiftPreference[] | MinimalNPC | undefined;
}
