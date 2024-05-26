import { AfterViewInit, Component, computed, DestroyRef, inject } from '@angular/core';
import { BaseJournalPageComponent } from '../base-journal-page/base-journal-page.component';
import { Item } from '@ci/data-types';
import { FormGroup } from "@angular/forms";
import { FilterForm } from "../../../shared/types/filter-form.type";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ToDoContext } from "../../../core/types/to-do-context.type";
import { startWith } from "rxjs";

@Component({
    selector: 'app-found',
    templateUrl: './found.component.html',
})
export class FoundComponent extends BaseJournalPageComponent<Item> implements AfterViewInit {

    contextsPerTab: ToDoContext[] = [
        "journal_artifacts",
        "journal_gems",
        "journal_fossils",
        "journal_scavangables"
    ]

    toDoContext = computed<ToDoContext | undefined>(() => {
        const selectedTabIndex = this.selectedTabIndex()
        return this.contextsPerTab[selectedTabIndex]
    });

    constructor() {
        super(new FormGroup<FilterForm>({}));

        this.tabs = [
            {
                title: 'Artifacts',
                data: this.getFilteredJournalData(
                    this._database.fetchJournalOrder$('journal-artifacts'),
                    this._database.fetchItems$(),
                    0
                )
            }, {
                title: 'Gems',
                data: this.getFilteredJournalData(
                    this._database.fetchJournalOrder$('journal-gems'),
                    this._database.fetchItems$(),
                    1
                )
            }, {
                title: 'Fossils',
                data: this.getFilteredJournalData(
                    this._database.fetchJournalOrder$('journal-fossils'),
                    this._database.fetchItems$(),
                    2
                )
            }, {
                title: 'Scavangables',
                data: this.getFilteredJournalData(
                    this._database.fetchJournalOrder$('journal-scavangable'),
                    this._database.fetchItems$(),
                    3
                )
            },
        ];

        this.activateTabFromRoute(this.tabs.map(tab => tab.title));

    }

    ngAfterViewInit(): void {

        this.matTabGroup?.selectedIndexChange.pipe(
            takeUntilDestroyed(this.destroyRef),
            startWith(this.matTabGroup?.selectedIndex ?? 0)
        ).subscribe({
            next: (selectedTabIndex) => {
                this.selectedTabIndex.set(selectedTabIndex)
            }
        })
    }
}
