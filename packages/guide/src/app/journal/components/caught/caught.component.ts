import { Component } from '@angular/core';
import { Critter, Fish, Season, Seasons, Weather, Weathers } from '@ci/data-types';
import { BaseJournalPageComponent } from '../base-journal-page/base-journal-page.component';
import { getTruthyValues } from '@ci/util';
import { FilterForm } from "../../../shared/types/filter-form.type";
import { FormControl, FormGroup } from "@angular/forms";
import { ToDoCategory } from "../../../core/enums/todo-category.enum";

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
        }));

        this.registerToToDo = this.registerToToDo.bind(this)


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

    override registerToToDo(entry: Fish | Critter) {
        if ('fishName' in entry) {
            this._todo.add(ToDoCategory.JOURNAL_FISH, entry)
        } else {
            if ((this.matTabGroup?.selectedIndex === this.SEA_CRITTERS_INDEX)) {
                this._todo.add(ToDoCategory.JOURNAL_CRITTER, entry)
            } else {
                this._todo.add(ToDoCategory.JOURNAL_INSECTS, entry)
            }
        }
    }

    override filterPredicate(foundEntry: Fish | Critter, filterValues: FormGroup<FilterForm>["value"], index: number): boolean {
        if (!filterValues.season?.length) return false;
        if (!filterValues.weather?.length) return false;


        const spawnSeason = 'spawnSettings' in foundEntry ? foundEntry.spawnSettings.map(s => s.spawnSeason) : [foundEntry.spawnSeason];
        const spawnWeather = 'spawnSettings' in foundEntry ? foundEntry.spawnSettings.map(s => s.spawnWeather) : [foundEntry.spawnWeather];


        const seasonMatch = spawnSeason.reduce((previousValue, currentValue) => {
            const seasonString = getTruthyValues(currentValue).toLowerCase();
            const match = seasonString === 'any'
                || filterValues.season?.length === Seasons.length
                || !!filterValues.season?.some(season => seasonString.includes(('' + season).toLowerCase()));

            return previousValue || match
        }, false)

        const weatherMatch = spawnWeather.reduce((previousValue, currentValue) => {
            const weatherString = getTruthyValues(currentValue).toLowerCase();
            const match = (index === this.SEA_CRITTERS_INDEX)
                || weatherString === 'any'
                || filterValues.weather?.length === Weathers.length
                || !!filterValues.weather?.some(weather => weatherString.includes(('' + weather).toLowerCase()));
            return previousValue || match
        }, false);

        return seasonMatch && weatherMatch;

    }

}
