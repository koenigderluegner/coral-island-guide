import { Component, inject, ViewEncapsulation } from '@angular/core';
import { DatabaseService } from '../../../shared/services/database.service';
import { forkJoin, Observable, of, switchMap } from 'rxjs';
import { GiftPreferences, NPC } from '@ci/data-types';
import { MapKeyed } from '../../../shared/types/map-keyed.type';
import { UiIcon } from '../../../shared/enums/ui-icon.enum';

type CombinedGiftPreference = {
    preferences: MapKeyed<GiftPreferences>,
    npc: NPC | undefined
}

@Component({
    selector: 'app-gifting',
    templateUrl: './gifting.component.html',
    styleUrls: ['./gifting.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GiftingComponent {

    preferencesMap: {
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
    protected uiIcon = UiIcon;
    protected gifting$: Observable<CombinedGiftPreference[]>;
    private _database = inject(DatabaseService)

    constructor() {
        this.gifting$ = forkJoin({
            gifts: this._database.fetchGiftingPreferences$(),
            npcs: this._database.fetchNPCs$(),
        }).pipe(
            switchMap(({gifts, npcs}) => {

                const mappedGifts: CombinedGiftPreference[] = gifts.map(gift => {
                    return {
                        preferences: gift,
                        npc: npcs.find(npc => npc.key === gift.mapKey)
                    } satisfies CombinedGiftPreference
                })
                return of(mappedGifts)
            })
        )
    }


}
