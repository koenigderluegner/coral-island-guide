import { Pipe, PipeTransform } from '@angular/core';
import { BaseCrop, Crop, FruitPlant, FruitTree, Item } from "@ci/data-types";

@Pipe({
    name: 'isBaseCrop'
})
export class IsBaseCropPipe implements PipeTransform {

    transform(value: Crop | BaseCrop | FruitPlant | FruitTree | Item): value is BaseCrop {
        return 'dropData' in value;
    }

}
