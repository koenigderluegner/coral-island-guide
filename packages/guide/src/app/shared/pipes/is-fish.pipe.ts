import { Pipe, PipeTransform } from '@angular/core';
import { Critter, Fish } from "@ci/data-types";

@Pipe({
    name: 'isFish'
})
export class IsFishPipe implements PipeTransform {

    transform(critter: Fish | Critter): critter is Fish {
        return 'fishName' in critter;
    }

}
