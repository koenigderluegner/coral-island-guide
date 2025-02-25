import { Component } from '@angular/core';
import { Critter, Fish, Season, Seasons, Weather, Weathers } from '@ci/data-types';
import { BaseJournalPageComponent } from '../base-journal-page/base-journal-page.component';
import { getTruthyValues } from '@ci/util';
import { FilterForm } from "../../../shared/types/filter-form.type";
import { FormControl, FormGroup } from "@angular/forms";
import { ListDetailContainerComponent } from "../../../shared/components/list-detail-container/list-detail-container.component";
import { CaughtDetailsComponent } from "../caught-details/caught-details.component";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { DataFilterComponent } from "../../../shared/components/data-filter/data-filter.component";
import { ItemIconComponent } from "../../../shared/components/item-icon/item-icon.component";
import { CaughtTableComponent } from "../tables/caught-table/caught-table.component";
import { AsyncPipe } from "@angular/common";

@Component({
    selector: 'app-caught',
    templateUrl: './caught.component.html',

    imports: [
        ListDetailContainerComponent,
        CaughtDetailsComponent,
        MatTabGroup,
        MatTab,
        DataFilterComponent,
        ItemIconComponent,
        CaughtTableComponent,
        AsyncPipe
    ]
})
export class CaughtComponent extends BaseJournalPageComponent<Fish | Critter> {

    
    private readonly SEA_CRITTERS_INDEX = 2;

    constructor() {
        super(new FormGroup<FilterForm>({
                season: new FormControl<Season[]>([...Seasons], {nonNullable: true}),
                weather: new FormControl<Weather[]>([...Weathers], {nonNullable: true}),
                location: new FormControl<string | null>(null),
                showTable: new FormControl<boolean>(false, { nonNullable: true }),
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

        if ('spawnSettings' in foundEntry) {
            //it's a fish and has multiple locations with different weather and seasons
            return foundEntry.spawnSettings?.some((setting) => {
                return (
                    this.matchLocation(setting.spawnLocation, filterValues.location) &&
                    this.matchSeason(setting.spawnSeason, filterValues.season) &&
                    this.matchWeather(setting.spawnWeather, index, filterValues.weather)
                );
            });
        }

        return (
            this.matchLocation(foundEntry.spawnLocation, filterValues.location) &&
            this.matchSeason(foundEntry.spawnSeason, filterValues.season) &&
            this.matchWeather(foundEntry.spawnWeather, index, filterValues.weather)
        );
    }

    private matchLocation(spawnLocations: string[], desiredLocation?: string | null) {
        return !desiredLocation || spawnLocations.includes(desiredLocation);
    }

    private matchWeather(
        spawnWeather: {
            sunny: boolean;
            rain: boolean;
            storm: boolean;
            windy: boolean;
            snow: boolean;
            blizzard: boolean;
        },
        index: number,
        weather?: string[] | undefined
    ) {
        const weatherString = getTruthyValues(spawnWeather).toLowerCase();
        const match =
            index === this.SEA_CRITTERS_INDEX ||
            weatherString === 'any' ||
            weather?.length === Weathers.length ||
            !!weather?.some((specificWeather) => weatherString.includes(('' + specificWeather).toLowerCase()));
        return match;
    }

    private matchSeason(
        spawnSeason: { spring: boolean; summer: boolean; fall: boolean; winter: boolean },
        season?: Season[]
    ) {
        const seasonString = getTruthyValues(spawnSeason).toLowerCase();
        const match =
            seasonString === 'any' ||
            season?.length === Seasons.length ||
            !!season?.some((specificSeason) => seasonString.includes(('' + specificSeason).toLowerCase()));

        return match;
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
