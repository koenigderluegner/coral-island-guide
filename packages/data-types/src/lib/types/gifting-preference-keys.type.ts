export const GiftingPreferenceKeys = [
    'favoritePreferences',
    'lovePreferences',
    'likePreferences',
    'neutralPreferences',
    'dislikePreferences',
    'hatePreferences'
] as const

export type GiftingPreferenceKey = typeof GiftingPreferenceKeys[number];
