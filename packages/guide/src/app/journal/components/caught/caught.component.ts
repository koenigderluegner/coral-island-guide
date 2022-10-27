import { Component } from '@angular/core';
import { Critter, Fish } from '@ci/data-types';
import { Observable } from 'rxjs';
import { BaseJournalPageComponent } from '../base-journal-page/base-journal-page.component';

@Component({
    selector: 'app-caught',
    templateUrl: './caught.component.html',
    styleUrls: ['./caught.component.scss'],
})
export class CaughtComponent extends BaseJournalPageComponent<Fish | Critter> {

    fish$: Observable<Fish[]>;
    seaCritters$: Observable<Critter[]>;
    insects$: Observable<Critter[]>;

    constructor() {
        super();
        this.fish$ = this.getFilteredJournalData(
            this._database.fetchJournalOrder$('journal-fish'),
            this._database.fetchFish$()
        );
        this.insects$ = this.getFilteredJournalData(
            this._database.fetchJournalOrder$('journal-insects'),
            this._database.fetchBugsAndInsects$()
        );
        this.seaCritters$ = this.getFilteredJournalData(
            this._database.fetchJournalOrder$('journal-sea-critters'),
            this._database.fetchOceanCritters$()
        );

    }


}
