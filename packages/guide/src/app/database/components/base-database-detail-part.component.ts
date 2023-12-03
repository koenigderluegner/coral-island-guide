import { Component, inject, Input } from "@angular/core";
import { DatabaseItem, Item, TagBasedItem } from "@ci/data-types";
import { DatabaseService } from "../../shared/services/database.service";

@Component({template: ''})
export class BaseDatabaseDetailPartComponent {

    @Input({required: true}) databaseItem!: DatabaseItem;

    protected database: DatabaseService = inject(DatabaseService);


}
