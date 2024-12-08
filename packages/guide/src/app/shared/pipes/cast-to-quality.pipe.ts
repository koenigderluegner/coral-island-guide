import { Pipe, PipeTransform } from '@angular/core';
import { Quality } from "@ci/data-types";

@Pipe({
    name: 'castToQuality',

})
export class CastToQualityPipe implements PipeTransform {

    transform(value: string): Quality {
        switch (value) {
            case Quality.BRONZE:
            case Quality.SILVER:
            case Quality.GOLD:
            case Quality.OSMIUM:
                return value as Quality
            default:
                return Quality.BASE
        }
    }

}
