import { Component } from '@angular/core';
import { Critter, Fish } from '@ci/data-types';
import { BaseJournalPageComponent } from '../base-journal-page/base-journal-page.component';

@Component({
    selector: 'app-caught',
    templateUrl: './caught.component.html',
    styleUrls: ['./caught.component.scss'],
})
export class CaughtComponent extends BaseJournalPageComponent<Fish | Critter> {

    constructor() {
        super();


        this.tabs = [
            {
                title: 'Fish',
                data: this.getFilteredJournalData(
                    this._database.fetchJournalOrder$('journal-fish'),
                    this._database.fetchFish$()
                )
            }, {
                title: 'Insects',
                data: this.getFilteredJournalData(
                    this._database.fetchJournalOrder$('journal-insects'),
                    this._database.fetchBugsAndInsects$()
                )
            }, {
                title: 'Sea Critters',
                data: this.getFilteredJournalData(
                    this._database.fetchJournalOrder$('journal-sea-critters'),
                    this._database.fetchOceanCritters$()
                )
            },
        ];

    }


}
