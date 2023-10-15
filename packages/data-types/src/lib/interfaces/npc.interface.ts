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
    appearances: Record<string, Record<string, string>>
    headerPortraitFileName: string | null;
    customHead?: true,
    birthday?: SpecificDate
}
