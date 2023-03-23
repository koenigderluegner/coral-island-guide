import { Component, inject, Input } from "@angular/core";
import { Item } from "@ci/data-types";
import { DatabaseService } from "../../shared/services/database.service";

@Component({template: ''})
export class BaseDatabaseDetailPartComponent {

    @Input() item?: Item;

    protected database: DatabaseService = inject(DatabaseService);


}
