import { ObjectPath } from "../../../../types/object-path.type";
import { RawEffectWithMeta } from "./raw-effect-with-meta";

export type RawConsumeItemMasterEffect = RawEffectWithMeta<'ConsumeItemMastery', {
    masteryType: string;
    itemData: {
        data: {
            RowName: string;
        },
        itemID: string;
    },
    playAnimationTrigger: boolean;
    animationMontage: ObjectPath;
    sectionName: string;
    animationSpeed: number;
    endAnimMontage: ObjectPath;
}>;
