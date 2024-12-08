import { Pipe, PipeTransform } from '@angular/core';
import { BaseCrop, Crop, FruitPlant, FruitTree } from "@ci/data-types";

@Pipe({
    name: 'isCrop',
    standalone: false
})
export class IsCropPipe implements PipeTransform {

    transform(value: Crop | BaseCrop | FruitPlant | FruitTree): value is Crop {
        return 'pickupableItem' in value;
    }

}
