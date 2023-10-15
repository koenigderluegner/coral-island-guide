import { UiIcon } from "../enums/ui-icon.enum";
import { GiftingPreferenceKey } from "@ci/data-types";

export const preferencesMap: {
    icon: UiIcon,
    label: string;
    preferenceField: GiftingPreferenceKey
}[] = [
    {icon: UiIcon.LOVE, label: 'Favorite', preferenceField: 'favoritePreferences'},
    {icon: UiIcon.LOVE, label: 'Love', preferenceField: 'lovePreferences'},
    {icon: UiIcon.LIKE, label: 'Like', preferenceField: 'likePreferences'},
    {icon: UiIcon.NEUTRAL, label: 'Neutral', preferenceField: 'neutralPreferences'},
    {icon: UiIcon.DISLIKE, label: 'Dislike', preferenceField: 'dislikePreferences'},
    {icon: UiIcon.HATE, label: 'Hate', preferenceField: 'hatePreferences'},
];
