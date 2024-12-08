import { Pipe, PipeTransform } from '@angular/core';
import { SpecificDate } from "@ci/data-types";

@Pipe({
    name: 'ingameDate',

})
export class IngameDatePipe implements PipeTransform {
    transform(value: SpecificDate): string {
        return `${value.day} ${value.season}` + (value.year < 0 ? '' : `, Year ${value.year}`);
    }
}
