import { Component, inject, Input } from "@angular/core";
import { Item, TagBasedItem } from "@ci/data-types";
import { DatabaseService } from "../../shared/services/database.service";

@Component({template: ''})
export class BaseDatabaseDetailPartComponent {

    @Input() item?: Item;

    protected database: DatabaseService = inject(DatabaseService);

    getGenericItems(item: Item): TagBasedItem[] {
        return this.database.getTagBasedItems().filter(tbi => tbi.tags.some(tag => item.tags?.includes(tag)))
    }

}
