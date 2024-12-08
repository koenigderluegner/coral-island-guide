import { Component, computed, inject, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { DatabaseService } from '../../../shared/services/database.service';
import { forkJoin, Observable, of, switchMap } from 'rxjs';
import { GiftPreferences, MinimalItem, NPC, UiIcon } from '@ci/data-types';
import { MapKeyed } from '../../../shared/types/map-keyed.type';
import { NpcFilterComponent } from "../../npc-filter/npc-filter.component";
import { filterNPCs } from '../../filter-npcs.function';
import { BaseSelectableContainerComponent } from "../../../shared/components/base-selectable-container/base-selectable-container.component";
import { GiftingGridComponent } from "../gifting-grid/gifting-grid.component";
import { CardComponent } from "../../../shared/components/card/card.component";
import { ExpandableComponent } from "../../../shared/components/expandable/expandable.component";
import { OfferingComponent } from "../../../shared/components/database-item-details/offering/offering.component";
import { ListDetailContainerComponent } from "../../../shared/components/list-detail-container/list-detail-container.component";
import { ItemCardSwitchComponent } from "../../../shared/components/item-card-switch/item-card-switch.component";
import { UiIconComponent } from "../../../shared/components/ui-icon/ui-icon.component";
import { IngameDatePipe } from "../../../shared/pipes/ingame-date.pipe";
import { MatTooltip } from "@angular/material/tooltip";
import { ItemIconComponent } from "../../../shared/components/item-icon/item-icon.component";
import { AsyncPipe } from "@angular/common";

type CombinedGiftPreference = {
    preferences: MapKeyed<GiftPreferences>,
    npc: NPC | undefined
}

@Component({
    selector: 'app-gifting',
    templateUrl: './gifting.component.html',
    styleUrls: ['./gifting.component.scss'],
    encapsulation: ViewEncapsulation.None,

    imports: [
        GiftingGridComponent,
        CardComponent,
        ExpandableComponent,
        OfferingComponent,
        ListDetailContainerComponent,
        ItemCardSwitchComponent,
        UiIconComponent,
        IngameDatePipe,
        MatTooltip,
        ItemIconComponent,
        AsyncPipe,
        NpcFilterComponent
    ]
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
