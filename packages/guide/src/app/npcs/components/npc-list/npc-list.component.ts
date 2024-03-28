import { Component, computed, inject, Signal, viewChild, ViewEncapsulation } from '@angular/core';
import { DatabaseService } from "../../../shared/services/database.service";
import { NPC, UiIcon } from "@ci/data-types";
import { toSignal } from "@angular/core/rxjs-interop";
import { catchError, of } from "rxjs";
import { NpcFilterComponent } from "../../npc-filter/npc-filter.component";
import { filterNPCs } from "../../filter-npcs.function";

@Component({
    selector: 'app-npc-list',
    templateUrl: './npc-list.component.html',
    styleUrls: ['./npc-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NpcListComponent {

    protected readonly uiIcon = UiIcon;
    npcFilter = viewChild(NpcFilterComponent);
    #searchValueChanges = computed(() => this.npcFilter()?.searchValueChanges() ?? '')
    #sortValueChanges = computed(() => this.npcFilter()?.sortValueChanges() ?? 'default')
    #filterNPCs = filterNPCs
    readonly #npcList: Signal<NPC[] | undefined>;

    protected filteredAndSortedNpcs = computed(() => {

        let npcs = this.#npcList() ?? [];
        if (!this.#searchValueChanges || !this.#sortValueChanges) return npcs;
        const searchValue = this.#searchValueChanges().toLowerCase()
        const sortValue = this.#sortValueChanges()


        return this.#filterNPCs(npcs, searchValue, sortValue);


    })
    readonly #database = inject(DatabaseService)

    constructor() {
        this.#npcList = toSignal(this.#database.fetchNPCs$().pipe(
            catchError(() => of([]))
        ))
    }
}
