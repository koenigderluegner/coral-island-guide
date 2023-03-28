import { Component } from '@angular/core';
import { BaseJournalPageComponent } from '../base-journal-page/base-journal-page.component';
import { Item } from '@ci/data-types';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-produce',
    templateUrl: './produce.component.html',
})
export class ProduceComponent extends BaseJournalPageComponent<Item> {

    constructor() {
        super();


        this.tabs = [
            {
                title: 'Crops',
                data: this._database.fetchCrops$().pipe(
                    switchMap(() =>
                        this.getFilteredJournalData(
                            this._database.fetchJournalOrder$('journal-crops'),
                            this._database.fetchItems$()
                        ))
                )
            }, {
                title: 'Animal Products',
                data: this.getFilteredJournalData(
                    this._database.fetchJournalOrder$('journal-animal-products'),
                    this._database.fetchItems$()
                )
            }, {
                title: 'Artisan Products',
                data: this.getFilteredJournalData(
                    this._database.fetchJournalOrder$('journal-artisan-products'),
                    this._database.fetchItems$()
                )
            },
        ];
    }


}
