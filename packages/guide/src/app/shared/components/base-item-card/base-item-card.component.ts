import {
    booleanAttribute,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { Item, MinimalItem } from '@ci/data-types';
import { DatabaseService } from '../../services/database.service';
import { UiIcon } from "../../enums/ui-icon.enum";
import { ChecklistCategory } from "../../../core/enums/checklist-category.enum";
import { ChecklistService } from "../../../core/services/checklist.service";

@Component({
    selector: 'app-base-item-card',
    templateUrl: './base-item-card.component.html',
    styleUrls: ['./base-item-card.component.scss'],
})
export class BaseItemCardComponent implements OnInit, OnChanges {
    @Input() item?: Item | MinimalItem;
    @Input() amount?: number;
    @Input() checklistCategory?: ChecklistCategory | undefined;
    @Output() openDrawerChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() addedToChecklist: EventEmitter<void> = new EventEmitter<void>();
    @Input({transform: booleanAttribute}) hideQualityGrid = false
    protected uiIcon = UiIcon;
    protected fetchedItem?: Item;
    protected readonly UiIcon = UiIcon;

    constructor(private readonly _database: DatabaseService,
                protected readonly checklistService: ChecklistService) {
    }

    ngOnInit(): void {
        this._setItem(this.item);
    }

    isItem(item: Item | MinimalItem): item is Item {
        return ('sellPrice' in item) && ('price' in item) && ('description' in item);
    }

    ngOnChanges(changes: SimpleChanges): void {
        this._setItem(changes['item'].currentValue);
    }

    removeFromCheckList(checklistCategory: ChecklistCategory, item: Item | MinimalItem) {
        this.checklistService.updateStatus(checklistCategory, item, true, true)
    }

    private _setItem(item: Item | MinimalItem | undefined): void {
        if (!item) return;
        if (!this.isItem(item)) {
            this.fetchedItem = this._database.getItems().find(i => i.id === item.id);
        } else {
            this.fetchedItem = item;
        }
    }
}
