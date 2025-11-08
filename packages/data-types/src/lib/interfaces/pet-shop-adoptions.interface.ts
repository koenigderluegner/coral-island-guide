import { TranslationKey } from "../types/translation-key";

export interface PetShopAdoptions{
    npcData: {
        npcId: string;
    }
    price: number;
    description: TranslationKey;
    iconName: string;
}
