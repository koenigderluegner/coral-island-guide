import { Pipe, PipeTransform } from '@angular/core';
import { BaseCrop, Crop, FruitPlant, FruitTree, MinimalItem } from "@ci/data-types";

@Pipe({
    name: 'isBaseCrop',

})
export class IsBaseCropPipe implements PipeTransform {

    transform(value: Crop | BaseCrop | FruitPlant | FruitTree | MinimalItem): value is BaseCrop {
        return 'dropData' in value;
    }

}
