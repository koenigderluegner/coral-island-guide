import { Component, inject, input } from "@angular/core";
import { DatabaseItem } from "@ci/data-types";
import { DatabaseService } from "../../shared/services/database.service";

@Component({
    template: '',

})
export class BaseDatabaseDetailPartComponent {
    readonly databaseItem = input.required<DatabaseItem>();
    protected readonly database = inject(DatabaseService);
}
