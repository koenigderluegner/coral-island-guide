import {
    booleanAttribute,
    Component,
    EventEmitter,
    inject,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { CustomEntry, Item, MinimalItem, MinimalTagBasedItem, TagBasedItem, UiIcon } from '@ci/data-types';
import { DatabaseService } from '../../services/database.service';
import { ToDoCategory } from "../../../core/enums/todo-category.enum";
import { ToDoService } from "../../../core/services/to-do.service";
import { entityKey } from "@ci/util";

type ItemEntry = Item | MinimalItem | CustomEntry | MinimalTagBasedItem;

@Component({
    selector: 'app-base-item-card',
    templateUrl: './base-item-card.component.html',
})
export class BaseItemCardComponent implements OnInit, OnChanges {
    @Input({required: true}) item!: ItemEntry;
    @Input() amount?: number;
    @Input() toDoCategory?: ToDoCategory | undefined;
    @Output() openDrawerChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() addedToToDo: EventEmitter<void> = new EventEmitter<void>();
    @Input({transform: booleanAttribute}) hideQualityGrid = false
    protected uiIcon = UiIcon;
    protected fetchedItem?: Item | CustomEntry | TagBasedItem;
    protected readonly UiIcon = UiIcon;
    protected readonly toDoService: ToDoService = inject(ToDoService)
    private readonly _database: DatabaseService = inject(DatabaseService);

    ngOnInit(): void {
        this._setItem(this.item);
    }

    isTagBasedItem(item: ItemEntry): item is MinimalTagBasedItem {
        return 'key' in item;
    }

    isCustomEntry(item: ItemEntry): item is CustomEntry {
        return 'id' in item && !item.id.toLowerCase().startsWith('item_');
    }

    isItem(item: ItemEntry): item is Item {
        return ('sellPrice' in item) && ('price' in item) && ('description' in item) && item.id.toLowerCase().startsWith('item_');
    }

    ngOnChanges(changes: SimpleChanges): void {
        this._setItem(changes['item'].currentValue);
    }

    removeFromToDo(toDoCategory: ToDoCategory, item: ItemEntry) {
        this.toDoService.updateStatus(toDoCategory, item, true, true)
    }

    private _setItem(item: ItemEntry): void {

        if (!this.isItem(item)) {
            const fetchedItem = this._database.getItems().find(i => i.id === entityKey(item));

            if (fetchedItem) {
                this.fetchedItem = fetchedItem;
            } else if (this.isCustomEntry(item)) {
                this.fetchedItem = item;
            } else if (this.isTagBasedItem(item)) {
                this.fetchedItem = this._database.getTagBasedItems().find(i => i.key === entityKey(item));
            }

            if (!this.fetchedItem) {
                console.error(`couldn't find ${entityKey(item)} in base-card`)
                return;
            }


        } else {
            this.fetchedItem = item;
        }
    }
}
