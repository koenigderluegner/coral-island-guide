import { Pipe, PipeTransform } from '@angular/core';
import { MinimalTagBasedItem } from "@ci/data-types";

@Pipe({
    name: 'isMinimalTagBasedItem',
})
export class IsMinimalTagBasedItemPipe implements PipeTransform {
    transform(value: any): value is MinimalTagBasedItem {
        return !!value && 'key' in value && 'displayName' in value && 'iconName' in value;
    }
}
