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
import { CustomEntry, Item, MinimalItem } from '@ci/data-types';
import { DatabaseService } from '../../services/database.service';
import { UiIcon } from "../../enums/ui-icon.enum";
import { ToDoCategory } from "../../../core/enums/todo-category.enum";
import { ToDoService } from "../../../core/services/to-do.service";

@Component({
    selector: 'app-base-item-card',
    templateUrl: './base-item-card.component.html',
})
export class BaseItemCardComponent implements OnInit, OnChanges {
    @Input({required: true}) item!: Item | MinimalItem | CustomEntry;
    @Input() amount?: number;
    @Input() toDoCategory?: ToDoCategory | undefined;
    @Output() openDrawerChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() addedToToDo: EventEmitter<void> = new EventEmitter<void>();
    @Input({transform: booleanAttribute}) hideQualityGrid = false
    protected uiIcon = UiIcon;
    protected fetchedItem?: Item | CustomEntry;
    protected readonly UiIcon = UiIcon;
    protected readonly toDoService: ToDoService = inject(ToDoService)
    private readonly _database: DatabaseService = inject(DatabaseService);

    ngOnInit(): void {
        this._setItem(this.item);
    }

    isCustomEntry(item: Item | MinimalItem | CustomEntry): item is CustomEntry {
        return !item.id.toLowerCase().startsWith('item_');
    }

    isItem(item: Item | MinimalItem | CustomEntry): item is Item {
        return ('sellPrice' in item) && ('price' in item) && ('description' in item) && item.id.toLowerCase().startsWith('item_');
    }

    ngOnChanges(changes: SimpleChanges): void {
        this._setItem(changes['item'].currentValue);
    }

    removeFromToDo(toDoCategory: ToDoCategory, item: Item | MinimalItem) {
        this.toDoService.updateStatus(toDoCategory, item, true, true)
    }

    private _setItem(item: Item | MinimalItem | CustomEntry): void {

        if (!this.isItem(item)) {
            const fetchedItem = this._database.getItems().find(i => i.id === item.id);

            if (fetchedItem) {
                this.fetchedItem = fetchedItem;
            } else if (this.isCustomEntry(item)) {
                this.fetchedItem = item;
            }

            if (!fetchedItem) {
                console.error(`couldn't find ${item.id} in base-card`)
                return;
            }


        } else {
            this.fetchedItem = item;
        }
    }
}
