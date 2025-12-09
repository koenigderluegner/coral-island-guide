import { RawEffectWithMeta } from "./raw-effect-with-meta";
import { ItemDatatableRef } from "../../../../types/item-datatable-ref";

export type RawAddItemToInventoryEffect = RawEffectWithMeta<'AddItemToInventory', {
    itemData: ItemDatatableRef,
    quantity?: number;
    isQuestReward?: boolean
}> 
