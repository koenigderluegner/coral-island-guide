import { Directive } from '@angular/core';
import { DatabaseItem } from "@ci/data-types";

@Directive({
    selector: '[appDatabaseItemDetails]',
})
export class DatabaseItemDetailsDirective {

    static ngTemplateContextGuard(
        directive: DatabaseItemDetailsDirective,
        context: unknown,
    ): context is { $implicit: DatabaseItem } {
        return true;
    }
}
