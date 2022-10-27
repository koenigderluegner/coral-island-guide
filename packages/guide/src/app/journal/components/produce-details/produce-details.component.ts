import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Crop, Item } from '@ci/data-types';
import { DatabaseService } from '../../../shared/services/database.service';
import { map, Observable } from 'rxjs';
import { getTruthyValues } from '@ci/util';

@Component({
    selector: 'app-produce-details',
    templateUrl: './produce-details.component.html',
    styleUrls: ['./produce-details.component.scss'],
})
export class ProduceDetailsComponent implements OnChanges {
    @Input() item?: Item;
    crop$?: Observable<Crop | undefined>;
    getTruthyValues = getTruthyValues;


    constructor(private readonly _database: DatabaseService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        const currentValue: Item | undefined = changes['item']?.currentValue;
        if (currentValue) {

            this.crop$ = (this._database.fetchCrops$().pipe(
                map(crops => {
                    return crops.find(crop => crop.pickupableItemId === currentValue.id);
                })
            ));


        }
    }
}
