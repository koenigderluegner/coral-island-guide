export const ShopNames = ['blacksmith', 'lab'] as const;

export type ShopName = typeof ShopNames[number];

export const ShopDisplayNames = {blacksmith: 'Blacksmith', lab: 'Lab'} as const

type ShopDisplayName = (typeof ShopDisplayNames)[keyof typeof ShopDisplayNames]
