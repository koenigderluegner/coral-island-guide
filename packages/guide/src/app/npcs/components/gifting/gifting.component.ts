import { Component, inject, ViewEncapsulation } from '@angular/core';
import { DatabaseService } from '../../../shared/services/database.service';
import { forkJoin, Observable, of, switchMap } from 'rxjs';
import { GiftPreferences, NPC, UiIcon } from '@ci/data-types';
import { MapKeyed } from '../../../shared/types/map-keyed.type';

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
