import { Component, computed, inject, Signal, signal } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";
import { forkJoin, map, Observable, tap } from "rxjs";
import { FishDashboardEntry, MinimalItem, MinimalTagBasedItem, Season, SpecificDate, Weather } from "@ci/data-types";
import { MuseumChecklistService } from "../../../core/services/checklists/museum-checklist.service";
import { DatabaseService } from "../../../shared/services/database.service";
import { BaseSelectableContainerComponent } from "../../../shared/components/base-selectable-container/base-selectable-container.component";
import { FormControl, FormGroup } from "@angular/forms";
import { DashboardFilter } from "../../types/dashboard-filter.type";
import { toSignal } from "@angular/core/rxjs-interop";
import { ChecklistContext } from "../../types/checklist-context.type";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { addDays, dateInRanges } from "@ci/util";
import { UserDataService } from "../../../core/services/user-data.service";

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
})
export class IndexComponent extends BaseSelectableContainerComponent<MinimalItem | MinimalTagBasedItem> {

    dashboards = inject(DashboardService)
    museumChecklistService = inject(MuseumChecklistService);
    filterFormGroup: FormGroup<DashboardFilter>
    userData = inject(UserDataService)
    protected requests$: Observable<any>;
    protected fish: Signal<{
        context: ChecklistContext,
        entry: FishDashboardEntry,
        completed: boolean
    }[]>;
    protected birthdaysToday;
    protected birthdaysTomorrow;
    #database = inject(DatabaseService)
    museumChecklistDefinition$ = this.#database.fetchMuseumChecklist$();
    private museuemDef = signal<Record<string, MinimalItem[]>>({});

    constructor() {
        super();
        this.requests$ = forkJoin({
            museumDefinition: this.museumChecklistDefinition$.pipe(tap(d => this.museuemDef.set(d))),
            fish: this.dashboards.getFish$(),
            birthdays: this.dashboards.getBirthdays$(),
        });

        this.filterFormGroup = new FormGroup<DashboardFilter>({
            season: new FormControl<Season>("Spring", {nonNullable: true}),
            weather: new FormControl<Weather>("Sunny", {nonNullable: true}),
            day: new FormControl<number>(1, {nonNullable: true}),
            year: new FormControl<number>(1, {nonNullable: true}),
            hideCompleted: new FormControl<boolean>(true, {nonNullable: true}),
        })

        this.filterFormGroup.patchValue(this.userData.getCurrentData().myGuideFilter);

        const filterValues = toSignal(
            this.filterFormGroup.valueChanges.pipe(
                map(() => this.filterFormGroup.getRawValue()),
                tap(v => {
                    this.userData.getCurrentData().myGuideFilter = v;
                    this.userData.save()
                })
            ),
            {initialValue: this.filterFormGroup.getRawValue()}
        )

        this.fish = computed(() => {
            const fish = this.dashboards.getFish();
            const season: Season = filterValues().season;
            const weather: Weather = filterValues().weather;
            const hideCompleted = filterValues().hideCompleted;

            const baseList = fish().filter(f => {
                const seasonAndWeather = f.seasons.includes(season) && f.weathers.includes(weather);

                const date: SpecificDate = {
                    day: filterValues().day,
                    season: filterValues().season,
                    year: filterValues().year
                };

                const dateRanges = f.dateRanges.map(r => ({from: r.startsFrom, to: r.lastsTill}));

                return seasonAndWeather && (!f.dateRanges.length || dateInRanges(date, dateRanges, true));
            });

            const musuemFish: {
                context: ChecklistContext,
                entry: FishDashboardEntry,
                completed: boolean
            }[] = [];

            this.museuemDef()['Fish'].forEach(key => {

                const fish = baseList.find(f => f.id === key.id)
                if (fish) {
                    const completed = this.museumChecklistService.isChecked(fish.id);
                    if (!(completed && hideCompleted))
                        musuemFish.push({
                            completed: completed,
                            context: "museum",
                            entry: fish
                        })
                }
            })


            return musuemFish;


        });


        this.birthdaysToday = computed(() => {
            const birthdays = this.dashboards.getBirthdays()();
            const season: Season = filterValues().season;
            const day = filterValues().day;


            return birthdays.filter(e => e.birthday.day === day && e.birthday.season === season);


        });
        this.birthdaysTomorrow = computed(() => {
            const birthdays = this.dashboards.getBirthdays()();

            const season: Season = filterValues().season;
            const day = filterValues().day;
            const today: SpecificDate = {day, season, year: 1};

            const tomorrow = addDays(today, 1);

            return birthdays.filter(e => e.birthday.day === tomorrow.day && e.birthday.season === tomorrow.season);


        });
    }

    updateChecklist($event: MatCheckboxChange, id: string, context: ChecklistContext) {
        this.museumChecklistService.isChecked(id) ? this.museumChecklistService.remove(id) : this.museumChecklistService.add(id)
    }
}
