import { Pipe, PipeTransform } from '@angular/core';
import { MinimalItem } from "@ci/data-types";

@Pipe({
    name: 'isMinimalItem',

})
export class IsMinimalItemPipe implements PipeTransform {

    transform(value: any): value is MinimalItem {
        return !!value && 'id' in value && 'displayName' in value && 'iconName' in value;
    }
}
