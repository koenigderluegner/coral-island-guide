import { Pipe, PipeTransform } from '@angular/core';
import { GenericEntry, Item, ItemEntry, MinimalItem } from "@ci/data-types";

@Pipe({
    name: 'toItemListEntries',
    standalone: false
})
export class ToItemListEntriesPipe implements PipeTransform {
    transform(value: (MinimalItem | Item)[]): (ItemEntry | GenericEntry)[] {
        return value.map(i => {
            return {
                item: i,
                amount: 1
            }
        });
    }
}
