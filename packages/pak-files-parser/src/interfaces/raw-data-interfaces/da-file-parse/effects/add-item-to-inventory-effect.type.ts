import { RawEffectWithMeta } from "./raw-effect-with-meta";

export type RawAddItemToInventoryEffect = RawEffectWithMeta<'AddItemToInventory', {
    itemData: {
        data: {
            RowName: string;
        },
        itemID: string;
    },
    quantity?: number;
    isQuestReward?: boolean
}> 
