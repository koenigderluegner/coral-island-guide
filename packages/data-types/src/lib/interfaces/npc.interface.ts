import { SpecificDate } from "./specific-date.interface";

export interface NPC {
    key: string;
    characterName: string;
    description: string;
    isDateable: boolean,
    canHaveRelationships: boolean,
    canReceiveGifts: boolean,
    canInteract: boolean,
    characterCategory: string,
    iconName: string | null;
    appearances: { appearanceCategory?: string | undefined, appearances: Record<string, Record<string, string>> }[] // <appearance, <emotion, filepath>>
    headerPortraitFileName: string | null;
    customHead?: true,
    birthday?: SpecificDate
}
