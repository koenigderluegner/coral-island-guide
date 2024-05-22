import { Component, ContentChild, input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomEntry, MinimalTagBasedItem, Quality } from "@ci/data-types";
import { SharedModule } from "../../shared.module";
import { DatabaseItemDetailsComponent } from "../database-item-details/database-item-details.component";
import { DatabaseItemDetailsDirective } from "../../directives/database-item-details.directive";
import { ItemEntry } from "../../types/item-entry.type";
import { ToDoContext } from "../../../core/types/to-do-context.type";


@Component({
    selector: 'app-item-card-switch',
    standalone: true,
    imports: [CommonModule, SharedModule, DatabaseItemDetailsComponent, DatabaseItemDetailsDirective],
    templateUrl: './item-card-switch.component.html'
})
export class ItemCardSwitchComponent {
    item = input.required<ItemEntry>();
    @ContentChild(TemplateRef) databaseItemDetails: TemplateRef<any> | null = null;
    context = input<ToDoContext | undefined>();
    amount = input<number | undefined>();
    quality = input<Quality | undefined>();

    isTagBasedItem(item: ItemEntry): item is MinimalTagBasedItem {
        return 'key' in item;
    }

    isCustomEntry(item: ItemEntry): item is CustomEntry {
        return 'id' in item && !item.id.toLowerCase().startsWith('item_');
    }

}
