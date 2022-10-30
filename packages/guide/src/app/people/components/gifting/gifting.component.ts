import { Component, ViewEncapsulation } from '@angular/core';
import { DatabaseService } from '../../../shared/services/database.service';
import { Observable } from 'rxjs';
import { GiftPreferences } from '@ci/data-types';
import { MapKeyed } from '../../../shared/types/map-keyed.type';
import { UiIcon } from '../../../shared/enums/ui-icon.enum';
import { addSpacesToPascalCase } from '@ci/util';

@Component({
    selector: 'app-gifting',
    templateUrl: './gifting.component.html',
    styleUrls: ['./gifting.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GiftingComponent {


    gifting$: Observable<MapKeyed<GiftPreferences>[]>;

    preferencesMap: { icon: UiIcon, label: string; preferenceField: string }[] = [
        {icon: UiIcon.LOVE, label: 'Favorite', preferenceField: 'favoritePreferences'},
        {icon: UiIcon.LOVE, label: 'Love', preferenceField: 'lovePreferences'},
        {icon: UiIcon.LIKE, label: 'Like', preferenceField: 'likePreferences'},
        {icon: UiIcon.NEUTRAL, label: 'Neutral', preferenceField: 'neutralPreferences'},
        {icon: UiIcon.DISLIKE, label: 'Dislike', preferenceField: 'dislikePreferences'},
        {icon: UiIcon.HATE, label: 'Hate', preferenceField: 'hatePreferences'},
    ];

    protected _addSpacesToPascalCase = addSpacesToPascalCase;

    constructor(private readonly _database: DatabaseService) {
        this.gifting$ = this._database.fetchGiftingPreferences$();
    }

}
