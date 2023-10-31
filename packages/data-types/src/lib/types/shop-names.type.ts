import { UiIcon } from "../../../../guide/src/app/shared/enums/ui-icon.enum";

export const ShopNames = [
    'blacksmith',
    'lab',
    'general-store',
    'carpenter',
    'merfolk-oracle-tail-store',
    'merfolk-general-store',
    'pet-shop',
    'ranch',
    'beach-shack',
    'concerned-monkey',
    'bens-caravan',
    'bos',
    'socket-and-pan'
] as const;

export type ShopName = typeof ShopNames[number];

export const ShopDisplayNames = {
    blacksmith: 'Blacksmith',
    lab: 'Lab',
    'general-store': 'Sams general store',
    carpenter: 'Carpenter',
    'merfolk-general-store': 'Merfolk general store',
    'merfolk-oracle-tail-store': 'Merfolk tail store',
    'pet-shop': 'Pet Shop',
    ranch: 'Ranch',
    'beach-shack': 'Beach Shack',
    'concerned-monkey': 'Concerned Monkey',
    'bens-caravan': 'Bens Caravan',
    'bos': 'Band of Smiles',
    'socket-and-pan': 'Socket & Pan'
} as const

type ShopDisplayName = (typeof ShopDisplayNames)[keyof typeof ShopDisplayNames]

export const ShopIcons = {
    blacksmith: UiIcon.BLACKSMITH,
    lab: UiIcon.LAB,
    'general-store': UiIcon.STORE,
    carpenter: UiIcon.CARPENTER,
    'merfolk-general-store': UiIcon.CORAL,
    'merfolk-oracle-tail-store': UiIcon.CORAL,
    'pet-shop': UiIcon.ANIMAL_SHELTER,
    ranch: UiIcon.RANCH,
    'beach-shack': UiIcon.BEACH_SHACK,
    'concerned-monkey': UiIcon.ACHIEVEMENT,
    'bens-caravan': UiIcon.CARAVAN,
    'bos': UiIcon.BESTIARY,
    'socket-and-pan': UiIcon.COOKING,
} as const

