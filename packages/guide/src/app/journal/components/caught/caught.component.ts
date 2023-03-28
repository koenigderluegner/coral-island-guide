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

    override filterPredicate(foundEntry: Fish | Critter, filterValues: Partial<{ season: Season[]; weather: string[]; }>): boolean {

        if (!filterValues.season?.length) return false;

        const seasonString = getTruthyValues(foundEntry.spawnSeason).toLowerCase();
        const seasonMatch = seasonString === 'any' || !!filterValues.season?.some(season => seasonString.includes(('' + season).toLowerCase()));

        const weatherString = getTruthyValues(foundEntry.spawnWeather).toLowerCase();
        const weatherMatch = weatherString === 'any' || !!filterValues.weather?.some(weather => weatherString.includes(('' + weather).toLowerCase()));
        return seasonMatch && weatherMatch;

    }

}
