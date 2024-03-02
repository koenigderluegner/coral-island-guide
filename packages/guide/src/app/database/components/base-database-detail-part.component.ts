import { Component, inject, Input } from "@angular/core";
import { DatabaseItem } from "@ci/data-types";
import { DatabaseService } from "../../shared/services/database.service";

@Component({template: ''})
export class BaseDatabaseDetailPartComponent {

    @Input({required: true}) databaseItem!: DatabaseItem;

    protected database: DatabaseService = inject(DatabaseService);


}
