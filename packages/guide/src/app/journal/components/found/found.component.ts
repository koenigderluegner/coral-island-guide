import { Component } from '@angular/core';
import { BaseJournalPageComponent } from '../base-journal-page/base-journal-page.component';
import { Item } from '@ci/data-types';
import { FormGroup } from "@angular/forms";
import { FilterForm } from "../../../shared/types/filter-form.type";

@Component({
    selector: 'app-found',
    templateUrl: './found.component.html',
})
export class FoundComponent extends BaseJournalPageComponent<Item> {


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
}
