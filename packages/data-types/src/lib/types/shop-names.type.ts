export const ShopNames = ['blacksmith', 'lab', 'general-store'] as const;

export type ShopName = typeof ShopNames[number];

export const ShopDisplayNames = {blacksmith: 'Blacksmith', lab: 'Lab', 'general-store': 'Sams general store'} as const

type ShopDisplayName = (typeof ShopDisplayNames)[keyof typeof ShopDisplayNames]
