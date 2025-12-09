import { ObjectPath } from "../../../../types/object-path.type";
import { RawEffectWithMeta } from "./raw-effect-with-meta";
import { ItemDatatableRef } from "../../../../types/item-datatable-ref";

export type RawConsumeItemMasterEffect = RawEffectWithMeta<'ConsumeItemMastery', {
    masteryType: string;
    itemData: ItemDatatableRef,
    playAnimationTrigger: boolean;
    animationMontage: ObjectPath;
    sectionName: string;
    animationSpeed: number;
    endAnimMontage: ObjectPath;
}>;
