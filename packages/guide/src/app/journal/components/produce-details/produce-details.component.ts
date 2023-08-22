import { Component, Input } from '@angular/core';
import { Crop, FruitPlant, FruitTree, MinimalItem } from '@ci/data-types';

@Component({
    selector: 'app-produce-details',
    templateUrl: './produce-details.component.html',
})
export class ProduceDetailsComponent {
    @Input() item?: MinimalItem | Crop | FruitPlant | FruitTree;

}
