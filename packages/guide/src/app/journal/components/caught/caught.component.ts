import { Component } from '@angular/core';
import { Critter, Fish, Season, Seasons, Weather, Weathers } from '@ci/data-types';
import { BaseJournalPageComponent } from '../base-journal-page/base-journal-page.component';
import { getTruthyValues } from '@ci/util';
import { FilterForm } from "../../../shared/types/filter-form.type";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: 'app-caught',
    templateUrl: './caught.component.html',
})
export class CaughtComponent extends BaseJournalPageComponent<Fish | Critter> {


    private readonly SEA_CRITTERS_INDEX = 2;

    constructor() {
        super(new FormGroup<FilterForm>({
            season: new FormControl<Season[]>([...Seasons], {nonNullable: true}),
            weather: new FormControl<Weather[]>([...Weathers], {nonNullable: true}),
            location: new FormControl<string | null>(null),
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
                    this.SEA_CRITTERS_INDEX
                )
            },
        ];

        this.activateTabFromRoute(this.tabs.map(tab => tab.title));

    }

    override filterPredicate(foundEntry: Fish | Critter, filterValues: FormGroup<FilterForm>["value"], index: number): boolean {
        if (!filterValues.season?.length) return false;
        if (!filterValues.weather?.length) return false;


        const spawnSeason = 'spawnSettings' in foundEntry
            ? foundEntry.spawnSettings?.map(s => s.spawnSeason)
            : [foundEntry.spawnSeason];

        const spawnWeather = 'spawnSettings' in foundEntry
            ? foundEntry.spawnSettings?.map(s => s.spawnWeather)
            : [foundEntry.spawnWeather];

        const locations = 'spawnSettings' in foundEntry
            ? foundEntry.spawnSettings?.map(s => s.spawnLocation).flat()
            : foundEntry.spawnLocation

        const locationMatch = !filterValues.location || locations.includes(filterValues.location)

        if (!locationMatch) return false;

        const seasonMatch = spawnSeason.reduce((previousValue, currentValue) => {
            const seasonString = getTruthyValues(currentValue).toLowerCase();
            const match = seasonString === 'any'
                || filterValues.season?.length === Seasons.length
                || !!filterValues.season?.some(season => seasonString.includes(('' + season).toLowerCase()));

            return previousValue || match
        }, false)

        if (!seasonMatch) return false;

        const weatherMatch = spawnWeather.reduce((previousValue, currentValue) => {
            const weatherString = getTruthyValues(currentValue).toLowerCase();
            const match = (index === this.SEA_CRITTERS_INDEX)
                || weatherString === 'any'
                || filterValues.weather?.length === Weathers.length
                || !!filterValues.weather?.some(weather => weatherString.includes(('' + weather).toLowerCase()));
            return previousValue || match
        }, false);

        return weatherMatch;

    }

    getLocations(entries: (Fish | Critter)[]): string[] {
        if (!entries.length) return [];

        return [...new Set(
            entries
                .map(entry => {
                    if ('fishName' in entry) {
                        return entry.spawnSettings.map(spawnSettings => spawnSettings.spawnLocation)
                    } else {
                        return entry.spawnLocation
                    }
                })
                .flat(2))
        ].sort()


    }

    resetLocationFilter() {
        this.formControl.get('location')?.setValue(null)
    }
}
