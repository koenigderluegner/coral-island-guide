export interface NPC {
    key: string;
    characterName: string;
    description: string;
    isDateable: boolean,
    canHaveRelationships: boolean,
    canReceiveGifts: boolean,
    canInteract: boolean,
    CharacterCategory: string
}