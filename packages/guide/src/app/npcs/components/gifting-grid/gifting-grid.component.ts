import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { UiIcon } from "../../../shared/enums/ui-icon.enum";
import { GiftPreferences } from "@ci/data-types";

@Component({
    selector: 'app-gifting-grid',
    templateUrl: './gifting-grid.component.html',
    styleUrls: ['./gifting-grid.component.scss',],
    encapsulation: ViewEncapsulation.None
})
export class GiftingGridComponent {
    @HostBinding('class.gifting-preference-grid') setCssClass = true;
    @Input({required: true}) preferences!: GiftPreferences

    protected preferencesMap: {
        icon: UiIcon,
        label: string;
        preferenceField: string
    }[] = [
        {icon: UiIcon.LOVE, label: 'Favorite', preferenceField: 'favoritePreferences'},
        {icon: UiIcon.LOVE, label: 'Love', preferenceField: 'lovePreferences'},
        {icon: UiIcon.LIKE, label: 'Like', preferenceField: 'likePreferences'},
        {icon: UiIcon.NEUTRAL, label: 'Neutral', preferenceField: 'neutralPreferences'},
        {icon: UiIcon.DISLIKE, label: 'Dislike', preferenceField: 'dislikePreferences'},
        {icon: UiIcon.HATE, label: 'Hate', preferenceField: 'hatePreferences'},
    ];
}
