import { Component } from '@angular/core';
import { BaseJournalPageComponent } from '../base-journal-page/base-journal-page.component';
import { BaseCrop, Crop, FruitPlant, FruitTree, Item, Season } from '@ci/data-types';
import { combineLatest, of, switchMap } from 'rxjs';
import { FormControl, FormGroup } from "@angular/forms";
import { FilterForm } from "../../../shared/types/filter-form.type";
import { nonNullable } from "@ci/util";

@Component({
    selector: 'app-produce',
    templateUrl: './produce.component.html',
})
export class ProduceComponent extends BaseJournalPageComponent<Item | Crop | FruitPlant | FruitTree> {

    constructor() {
        super(new FormGroup<FilterForm>({
            season: new FormControl<Season[]>(Object.values(Season), {nonNullable: true}),
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
        ];

        this.activateTabFromRoute(this.tabs.map(tab => tab.title));
    }

    protected castToItemArray(array: Array<any>): Item[] {
        return array as Item[]
    }

    protected castToBaseCropArray(array: Array<any>): BaseCrop[] {
        return array as BaseCrop[]
    }


}
