export const ShopNames = ['blacksmith'] as const;

export type ShopName = typeof ShopNames[number];

export const ShopDisplayNames = {blacksmith: 'Blacksmith'} as const

type  ShopDisplayName = (typeof ShopDisplayNames)[keyof typeof ShopDisplayNames]
