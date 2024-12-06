import { Component, computed, inject, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { DatabaseService } from '../../../shared/services/database.service';
import { forkJoin, Observable, of, switchMap } from 'rxjs';
import { GiftPreferences, MinimalItem, NPC, UiIcon } from '@ci/data-types';
import { MapKeyed } from '../../../shared/types/map-keyed.type';
import { NpcFilterComponent } from "../../npc-filter/npc-filter.component";
import { filterNPCs } from '../../filter-npcs.function';
import { BaseSelectableContainerComponent } from "../../../shared/components/base-selectable-container/base-selectable-container.component";

type CombinedGiftPreference = {
    preferences: MapKeyed<GiftPreferences>,
    npc: NPC | undefined
}

@Component({
    selector: 'app-gifting',
    templateUrl: './gifting.component.html',
    styleUrls: ['./gifting.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class GiftingComponent extends BaseSelectableContainerComponent<MinimalItem> {

    npcFilter = viewChild(NpcFilterComponent);
    protected uiIcon = UiIcon;
    protected gifting$: Observable<CombinedGiftPreference[]>;
    #searchValueChanges = computed(() => this.npcFilter()?.searchValueChanges() ?? '')
    #sortValueChanges = computed(() => this.npcFilter()?.sortValueChanges() ?? 'default')
    #filterNPCs = filterNPCs
    readonly #npcList = signal<CombinedGiftPreference[] | undefined>(undefined);
    protected filteredAndSortedNpcs = computed(() => {

        let npcs = this.#npcList() ?? [];
        if (!this.#searchValueChanges || !this.#sortValueChanges) return npcs;
        const searchValue = this.#searchValueChanges().toLowerCase()
        const sortValue = this.#sortValueChanges()

        return this.#filterNPCs(npcs, searchValue, sortValue);


    })
    #database = inject(DatabaseService)

    constructor() {
        super();
        this.gifting$ = forkJoin({
            gifts: this.#database.fetchGiftingPreferences$(),
            npcs: this.#database.fetchNPCs$(),
        }).pipe(
            switchMap(({gifts, npcs}) => {

                const mappedGifts: CombinedGiftPreference[] = gifts.map(gift => {
                    return {
                        preferences: gift,
                        npc: npcs.find(npc => npc.key === gift.mapKey)
                    } satisfies CombinedGiftPreference
                })

                this.#npcList?.set(mappedGifts)
                return of(mappedGifts)
            })
        )
    }


}
