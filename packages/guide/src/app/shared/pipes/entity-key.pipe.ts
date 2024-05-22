import { Pipe, PipeTransform } from '@angular/core';
import { MinimalItem, MinimalNPC, MinimalTagBasedItem } from "@ci/data-types";
import { entityKey } from "@ci/util";

@Pipe({
    name: 'entityKey',
})
export class EntityKeyPipe implements PipeTransform {
    transform(value: undefined): undefined;
    transform(value: null): null;
    transform(value: MinimalItem | MinimalTagBasedItem | MinimalNPC): string ;
    transform(value: MinimalItem | MinimalTagBasedItem | MinimalNPC | undefined): string | undefined;
    transform(value: MinimalItem | MinimalTagBasedItem | MinimalNPC | undefined | null): string | undefined | null {
        if (!value) return value;

        return entityKey(value)
    }
}
