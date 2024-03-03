import { Pipe } from '@angular/core';
import { TagBasedItem } from "@ci/data-types";
import { IsMinimalTagBasedItemPipe } from "./is-minimal-tag-based-item.pipe";

@Pipe({
    name: 'isTagBasedItem',
})
export class IsTagBasedItemPipe extends IsMinimalTagBasedItemPipe {
    override transform(value: any): value is TagBasedItem {
        return super.transform(value) && 'items' in value;
    }
}
