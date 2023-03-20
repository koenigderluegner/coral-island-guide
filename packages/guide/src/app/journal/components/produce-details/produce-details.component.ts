import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Crop, FruitPlant, FruitTree, Item } from '@ci/data-types';
import { DatabaseService } from '../../../shared/services/database.service';
import { combineLatest, map, Observable } from 'rxjs';
import { getTruthyValues } from '@ci/util';

@Component({
    selector: 'app-produce-details',
    templateUrl: './produce-details.component.html',
})
export class ProduceDetailsComponent implements OnChanges {
    @Input() item?: Item;
    crop$?: Observable<Crop | FruitPlant | FruitTree | undefined>;
    getTruthyValues = getTruthyValues;


    constructor(private readonly _database: DatabaseService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        const currentValue: Item | undefined = changes['item']?.currentValue;
        if (currentValue) {

            this.crop$ = combineLatest([
                this._database.fetchCrops$(),
                this._database.fetchFruitTrees$(),
                this._database.fetchFruitPlants$(),
            ]).pipe(
                map(([crops, fruitTrees, fruitPlants]) => {
                    return crops.find(crop => crop.pickupableItemId === currentValue.id)
                        ?? fruitPlants.find(crop => crop.dropData.some(dropData => dropData.itemId === currentValue.id))
                        ?? fruitTrees.find(crop => crop.dropData.some(dropData => dropData.itemId === currentValue.id));
                })
            );


        }
    }
}
