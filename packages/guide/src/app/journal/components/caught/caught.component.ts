import { Component } from '@angular/core';
import { Critter, Fish, Season } from '@ci/data-types';
import { BaseJournalPageComponent } from '../base-journal-page/base-journal-page.component';
import { getTruthyValues } from '@ci/util';
import { FilterForm } from "../../../shared/types/filter-form.type";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: 'app-caught',
    templateUrl: './caught.component.html',
    styleUrls: ['./caught.component.scss'],
})
export class CaughtComponent extends BaseJournalPageComponent<Fish | Critter> {


    private readonly SEA_CRITTERS_INDEX = 2;


    constructor() {
        super(new FormGroup<FilterForm>({
            season: new FormControl<Season[]>([Season.SPRING, Season.SUMMER, Season.FALL, Season.WINTER], {nonNullable: true}),
            weather: new FormControl<string[]>([], {nonNullable: true}),
        }));


        this.tabs = [
            {
                title: 'Fish',
                data: this.getFilteredJournalData(
                    this._database.fetchJournalOrder$('journal-fish'),
                    this._database.fetchFish$(),
                    0
                )
            }, {
                title: 'Insects',
                data: this.getFilteredJournalData(
                    this._database.fetchJournalOrder$('journal-insects'),
                    this._database.fetchBugsAndInsects$(),
                    1
                )
            }, {
                title: 'Sea Critters',
                data: this.getFilteredJournalData(
                    this._database.fetchJournalOrder$('journal-sea-critters'),
                    this._database.fetchOceanCritters$(),
                    2
                )
            },
        ];

    }

    override filterPredicate(foundEntry: Fish | Critter, filterValues: FormGroup<FilterForm>["value"], index: number): boolean {
        if (!filterValues.season?.length) return false;

        const seasonString = getTruthyValues(foundEntry.spawnSeason).toLowerCase();
        const seasonMatch = seasonString === 'any' || !!filterValues.season?.some(season => seasonString.includes(('' + season).toLowerCase()));

        const weatherString = getTruthyValues(foundEntry.spawnWeather).toLowerCase();
        const weatherMatch = (index === this.SEA_CRITTERS_INDEX) || weatherString === 'any' || !!filterValues.weather?.some(weather => weatherString.includes(('' + weather).toLowerCase()));
        return seasonMatch && weatherMatch;

    }

}
