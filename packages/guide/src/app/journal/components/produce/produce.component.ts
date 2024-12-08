import { Component, computed, inject } from '@angular/core';
import { BaseJournalPageComponent } from '../base-journal-page/base-journal-page.component';
import { BaseCrop, Crop, FruitPlant, FruitTree, Item, MinimalItem, Season, Seasons } from '@ci/data-types';
import { combineLatest, of, switchMap } from 'rxjs';
import { FormControl, FormGroup } from "@angular/forms";
import { FilterForm } from "../../../shared/types/filter-form.type";
import { nonNullable } from "@ci/util";
import { ToDoContext } from "../../../core/types/to-do-context.type";
import { SettingsService } from "../../../shared/services/settings.service";

@Component({
    selector: 'app-produce',
    templateUrl: './produce.component.html',
    standalone: false
})
export class ProduceComponent extends BaseJournalPageComponent<MinimalItem | Crop | FruitPlant | FruitTree> {
    isBeta = inject(SettingsService).getSettings().useBeta
    toDoContext = computed<ToDoContext | undefined>(() => {

        const selectedTabIndex = this.selectedTabIndex()

        return selectedTabIndex === 0
            ? "journal_crops"
            : selectedTabIndex === 1
                ? "journal_animal_produce"
                : selectedTabIndex === 2
                    ? "artisan"
                    : selectedTabIndex === 3
                        ? "journal_ocean_produce"
                        : undefined;
    });

    constructor() {
        super(new FormGroup<FilterForm>({
            season: new FormControl<Season[]>([...Seasons], {nonNullable: true}),
        }));

        this.tabs = [
            {
                title: 'Crops',
                data: combineLatest([
                    this._database.fetchCrops$(),
                    this._database.fetchFruitTrees$(),
                    this._database.fetchFruitPlants$(),
                ]).pipe(
                    switchMap(([crops, fruitTrees, fruitPlants]) =>
                        this.getFilteredJournalData(
                            this._database.fetchJournalOrder$('journal-crops'),
                            this._database.fetchItems$().pipe(
                                switchMap(items => {
                                    return of(items.map(item => {
                                        return crops.find(crop => crop.pickupableItemId === item.id)
                                            ?? fruitPlants.find(crop => crop.dropData.some(dropData => dropData.itemId === item.id))
                                            ?? fruitTrees.find(crop => crop.dropData.some(dropData => dropData.itemId === item.id));
                                    }).filter(nonNullable))
                                })
                            ),
                            0
                        ))
                )
            }, {
                title: 'Animal Products',
                data: this.getFilteredJournalData(
                    this._database.fetchJournalOrder$('journal-animal-products'),
                    this._database.fetchItems$(),
                    1
                )
            }, {
                title: 'Artisan Products',
                data: this.getFilteredJournalData(
                    this._database.fetchJournalOrder$('journal-artisan-products'),
                    this._database.fetchItems$(),
                    2
                )
            },
              {
                    title: 'Ocean',
                    data: this.getFilteredJournalData(
                        this._database.fetchJournalOrder$('journal-ocean-products'),
                        this._database.fetchItems$(),
                        3
                    )
                },

        ];

        this.activateTabFromRoute(this.tabs.map(tab => tab.title));
    }

    override filterPredicate(foundEntry: MinimalItem | Crop | FruitPlant | FruitTree, filterValues: FormGroup<FilterForm>["value"]): boolean {
        if (!('growableSeason' in foundEntry)) return true;

        if (!filterValues.season?.length) return false;

        const seasonString = foundEntry.growableSeason.join(' ').toLowerCase();
        const seasonMatch = filterValues.season?.length === Seasons.length
            || !!filterValues.season?.some(season => seasonString.includes(('' + season).toLowerCase()));

        return seasonMatch;

    }

    protected castToItemArray(array: Array<any>): Item[] {
        return array as Item[]
    }

    protected castToBaseCropArray(array: Array<any>): BaseCrop[] {
        return array as BaseCrop[]
    }


}
