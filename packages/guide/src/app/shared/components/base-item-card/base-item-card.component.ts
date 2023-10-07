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
import { Item, MinimalItem } from '@ci/data-types';
import { DatabaseService } from '../../services/database.service';
import { UiIcon } from "../../enums/ui-icon.enum";
import { ToDoCategory } from "../../../core/enums/todo-category.enum";
import { ToDoService } from "../../../core/services/to-do.service";

@Component({
    selector: 'app-base-item-card',
    templateUrl: './base-item-card.component.html',
})
export class BaseItemCardComponent implements OnInit, OnChanges {
    @Input({required: true}) item!: Item | MinimalItem;
    @Input() amount?: number;
    @Input() toDoCategory?: ToDoCategory | undefined;
    @Output() openDrawerChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() addedToToDo: EventEmitter<void> = new EventEmitter<void>();
    @Input({transform: booleanAttribute}) hideQualityGrid = false
    protected uiIcon = UiIcon;
    protected fetchedItem!: Item;
    protected readonly UiIcon = UiIcon;
    protected readonly toDoService: ToDoService = inject(ToDoService)
    private readonly _database: DatabaseService = inject(DatabaseService);

    ngOnInit(): void {
        this._setItem(this.item);
    }

    isItem(item: Item | MinimalItem): item is Item {
        return ('sellPrice' in item) && ('price' in item) && ('description' in item);
    }

    ngOnChanges(changes: SimpleChanges): void {
        this._setItem(changes['item'].currentValue);
    }

    removeFromToDo(toDoCategory: ToDoCategory, item: Item | MinimalItem) {
        this.toDoService.updateStatus(toDoCategory, item, true, true)
    }

    private _setItem(item: Item | MinimalItem): void {

        if (!this.isItem(item)) {
            const fetchedItem = this._database.getItems().find(i => i.id === item.id);

            if (!fetchedItem) {
                console.error(`couldn't find ${item.id} in base-card`)
                return;
            }

            this.fetchedItem = fetchedItem;
        } else {
            this.fetchedItem = item;
        }
    }
}
