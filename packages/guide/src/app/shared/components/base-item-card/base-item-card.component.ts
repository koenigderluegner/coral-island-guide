import { booleanAttribute, Component, computed, inject, input } from '@angular/core';
import { CustomEntry, Item, MinimalItem, MinimalTagBasedItem, Quality, TagBasedItem, UiIcon } from '@ci/data-types';
import { DatabaseService } from '../../services/database.service';
import { entityKey } from "@ci/util";
import { ToDoContext } from "../../../core/types/to-do-context.type";
import { ListDetailService } from "../list-detail-container/list-detail.service";

type ItemEntry = Item | MinimalItem | CustomEntry | MinimalTagBasedItem;

@Component({
    selector: 'app-base-item-card',
    templateUrl: './base-item-card.component.html',
})
export class BaseItemCardComponent {
    item = input.required<ItemEntry>();
    context = input<ToDoContext | undefined>();
    amount = input<number>();
    quality = input<Quality>();
    hideQualityGrid = input(false, {transform: booleanAttribute});

    protected uiIcon = UiIcon;
    protected readonly UiIcon = UiIcon;
    protected readonly listDetails = inject(ListDetailService);
    readonly #database: DatabaseService = inject(DatabaseService);
    protected computedItem = computed<Item | CustomEntry | TagBasedItem | undefined>(() => {

        const item = this.item()

        if (!this.isItem(item)) {
            const fetchedItem = this.#database.getItems().find(i => i.id === entityKey(item));

            if (fetchedItem) {
                return fetchedItem;
            } else if (this.isCustomEntry(item)) {
                return item;
            } else if (this.isTagBasedItem(item)) {
                return this.#database.getTagBasedItems().find(i => i.key === entityKey(item));
            }
            console.error(`couldn't find ${entityKey(item)} in base-card`)

            return;

        } else {
            return item;
        }


    });

    isTagBasedItem(item: ItemEntry): item is MinimalTagBasedItem {
        return 'key' in item;
    }

    isCustomEntry(item: ItemEntry): item is CustomEntry {
        return 'id' in item && !item.id.toLowerCase().startsWith('item_');
    }

    isItem(item: ItemEntry): item is Item {
        return ('sellPrice' in item) && ('price' in item) && ('description' in item) && item.id.toLowerCase().startsWith('item_');
    }


}
