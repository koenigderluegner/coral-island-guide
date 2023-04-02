import { Component, Input } from '@angular/core';
import { Crop, FruitPlant, FruitTree, Item } from '@ci/data-types';
import { getTruthyValues } from '@ci/util';

@Component({
    selector: 'app-produce-details',
    templateUrl: './produce-details.component.html',
})
export class ProduceDetailsComponent {
    @Input() item?: Item | Crop | FruitPlant | FruitTree;
    getTruthyValues = getTruthyValues;

}
