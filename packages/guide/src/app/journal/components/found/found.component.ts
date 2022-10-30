import { Component } from '@angular/core';
import { BaseJournalPageComponent } from '../base-journal-page/base-journal-page.component';
import { Item } from '@ci/data-types';

@Component({
    selector: 'app-found',
    templateUrl: './found.component.html',
    styleUrls: ['./found.component.scss'],
})
export class FoundComponent extends BaseJournalPageComponent<Item> {


    constructor() {
        super();

        this.tabs = [
            {
                title: 'Artifacts',
                data: this.getFilteredJournalData(
                    this._database.fetchJournalOrder$('journal-artifacts'),
                    this._database.fetchItems$()
                )
            }, {
                title: 'Gems',
                data: this.getFilteredJournalData(
                    this._database.fetchJournalOrder$('journal-gems'),
                    this._database.fetchItems$()
                )
            }, {
                title: 'Fossils',
                data: this.getFilteredJournalData(
                    this._database.fetchJournalOrder$('journal-fossils'),
                    this._database.fetchItems$()
                )
            }, {
                title: 'Scavangables',
                data: this.getFilteredJournalData(
                    this._database.fetchJournalOrder$('journal-scavangable'),
                    this._database.fetchItems$()
                )
            },
        ];

    }
}
