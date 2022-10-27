import { Component } from '@angular/core';
import { BaseJournalPageComponent } from '../base-journal-page/base-journal-page.component';
import { Item } from '@ci/data-types';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-found',
    templateUrl: './found.component.html',
    styleUrls: ['./found.component.scss'],
})
export class FoundComponent extends BaseJournalPageComponent<Item> {

    artifacts$: Observable<Item[]>;
    fossils$: Observable<Item[]>;
    gems$: Observable<Item[]>;
    scavangable$: Observable<Item[]>;


    constructor() {
        super();
        this.artifacts$ = this.getFilteredJournalData(
            this._database.fetchJournalOrder$('journal-artifacts'),
            this._database.fetchItems$()
        );
        this.fossils$ = this.getFilteredJournalData(
            this._database.fetchJournalOrder$('journal-fossils'),
            this._database.fetchItems$()
        );
        this.gems$ = this.getFilteredJournalData(
            this._database.fetchJournalOrder$('journal-gems'),
            this._database.fetchItems$()
        );
        this.scavangable$ = this.getFilteredJournalData(
            this._database.fetchJournalOrder$('journal-scavangable'),
            this._database.fetchItems$()
        );

    }
}
