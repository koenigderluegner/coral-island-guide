import { GiftPreference, NPC } from "@ci/data-types";

export type BirthdayDashboardEntry = {
    npcKey: NPC['key']
    birthday: NonNullable<NPC['birthday']>,
    lovedGifts: GiftPreference[]
} & Pick<NPC, 'characterName' | 'iconName'>
