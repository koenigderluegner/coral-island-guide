import { Component } from '@angular/core';
import { Critter, Fish } from '@ci/data-types';
import { BaseJournalPageComponent } from '../base-journal-page/base-journal-page.component';
import { getTruthyValues } from '@ci/util';
import { Season } from '../../../shared/enums/season.enum';

@Component({
    selector: 'app-caught',
    templateUrl: './caught.component.html',
    styleUrls: ['./caught.component.scss'],
})
export class CaughtComponent extends BaseJournalPageComponent<Fish | Critter> {
    showTable = false;

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

    private _isFish(array: (Critter | Fish) | undefined): array is Fish {
        return !!array && 'fishName' in array;
    }


    override filterPredicate(foundEntry: Fish | Critter, filterValues: Season[]): boolean {

        if (filterValues.length === 0) return false;

        if (this._isFish(foundEntry)) {
            const seasonString = getTruthyValues(foundEntry.spawnSeason).toLowerCase();
            return seasonString === 'any' || filterValues.some(season => seasonString.includes(('' + season).toLowerCase()));
        }

        return true;
    }


}
