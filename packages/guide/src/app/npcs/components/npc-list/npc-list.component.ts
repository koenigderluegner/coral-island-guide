import { Component, computed, inject, Signal, ViewEncapsulation } from '@angular/core';
import { DatabaseService } from "../../../shared/services/database.service";
import { NPC, SpecificDate, UiIcon } from "@ci/data-types";
import { toSignal } from "@angular/core/rxjs-interop";
import { catchError, of } from "rxjs";
import { FormControl } from "@angular/forms";
import { NpcSortValues, sortOptions } from "../../npc-sort-options.const";

@Component({
    selector: 'app-npc-list',
    templateUrl: './npc-list.component.html',
    styleUrls: ['./npc-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NpcListComponent {

    searchControl: FormControl<string> = new FormControl<string>('', {nonNullable: true})
    sortControl: FormControl<NpcSortValues> = new FormControl<NpcSortValues>('default', {nonNullable: true})
    sortOrderControl: FormControl<'asc' | 'desc'> = new FormControl<'asc' | 'desc'>('asc', {nonNullable: true})
    searchValueChanges = toSignal(this.searchControl.valueChanges, {initialValue: ''})
    sortValueChanges = toSignal(this.sortControl.valueChanges, {initialValue: 'default'})
    sortOrderValueChanges = toSignal(this.sortOrderControl.valueChanges, {initialValue: 'asc'})
    protected npcSortOptions = sortOptions;
    protected readonly uiIcon = UiIcon;
    readonly #npcList: Signal<NPC[] | undefined>;

    #seasonWeightForSorting: Map<SpecificDate['season'], number> = new Map<SpecificDate["season"], number>([
        ["Spring", 100],
        ["Summer", 200],
        ["Fall", 300],
        ["Winter", 400],
    ])


    filteredAndSortedNpcs = computed(() => {

        const searchValue = this.searchValueChanges().toLowerCase()
        const sortValue = this.sortValueChanges()
        let npcs = this.#npcList() ?? [];

        switch (sortValue) {
            case "alphabetical":
                npcs = [...npcs].sort((a, b) => a.characterName.localeCompare(b.characterName))
                break;
            case "birthdate":
                npcs = [...npcs].sort((a, b) => {
                    if (!a.birthday && b.birthday) return 1;
                    if (a.birthday && !b.birthday) return -1;
                    if (!a.birthday && !b.birthday) return 0;

                    const aBirthday = a.birthday!;
                    const bBirthday = b.birthday!;
                    const aValue = (this.#seasonWeightForSorting.get(aBirthday.season) ?? 0) + aBirthday.day
                    const bValue = (this.#seasonWeightForSorting.get(bBirthday.season) ?? 0) + bBirthday.day

                    return aValue - bValue
                })
                break;
        }

        if (!searchValue) return npcs;

        return npcs.filter(npc => {
            return npc.characterName.toLowerCase().includes(searchValue)
        })


    })
    readonly #database = inject(DatabaseService)

    constructor() {
        this.#npcList = toSignal(this.#database.fetchNPCs$().pipe(
            catchError(() => of([]))
        ))
    }
}
