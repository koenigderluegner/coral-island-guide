import { Component } from '@angular/core';
import { Critter, Fish, Season, Weather } from '@ci/data-types';
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
            season: new FormControl<Season[]>(Object.values(Season), {nonNullable: true}),
            weather: new FormControl<string[]>(Object.values(Weather), {nonNullable: true}),
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


        const seasonString = getTruthyValues(foundEntry.spawnSeason).toLowerCase();
        const seasonMatch = seasonString === 'any'
            || filterValues.season?.length === Object.values(Season).length
            || !!filterValues.season?.some(season => seasonString.includes(('' + season).toLowerCase()));

        const weatherString = getTruthyValues(foundEntry.spawnWeather).toLowerCase();
        const weatherMatch = (index === this.SEA_CRITTERS_INDEX)
            || weatherString === 'any'
            || filterValues.weather?.length === Object.values(Weather).length
            || !!filterValues.weather?.some(weather => weatherString.includes(('' + weather).toLowerCase()));
        return seasonMatch && weatherMatch;

    }

}
