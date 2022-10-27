import { Component } from '@angular/core';
import { BaseJournalPageComponent } from '../base-journal-page/base-journal-page.component';
import { Item } from '@ci/data-types';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-produce',
    templateUrl: './produce.component.html',
    styleUrls: ['./produce.component.scss'],
})
export class ProduceComponent extends BaseJournalPageComponent<Item> {

    animalProducts$: Observable<Item[]>;
    artisanProducts$: Observable<Item[]>;
    crops$: Observable<Item[]>;

    constructor() {
        super();
        this.animalProducts$ = this.getFilteredJournalData(
            this._database.fetchJournalOrder$('journal-animal-products'),
            this._database.fetchItems$()
        );
        this.artisanProducts$ = this.getFilteredJournalData(
            this._database.fetchJournalOrder$('journal-artisan-products'),
            this._database.fetchItems$()
        );
        this.crops$ = this.getFilteredJournalData(
            this._database.fetchJournalOrder$('journal-crops'),
            this._database.fetchItems$()
        );

    }
}
