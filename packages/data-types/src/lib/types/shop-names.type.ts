export const ShopNames = [
    'blacksmith',
    'lab',
    'general-store',
    'carpenter',
    'merfolk-oracle-tail-store',
    'merfolk-general-store',
    'pet-shop'
] as const;

export type ShopName = typeof ShopNames[number];

export const ShopDisplayNames = {
    blacksmith: 'Blacksmith',
    lab: 'Lab',
    'general-store': 'Sams general store',
    carpenter: 'Carpenter',
    'merfolk-general-store': 'Merfolk general store',
    'merfolk-oracle-tail-store': 'Merfolk tail store',
    'pet-shop': 'Pet Shop'
} as const

type ShopDisplayName = (typeof ShopDisplayNames)[keyof typeof ShopDisplayNames]
