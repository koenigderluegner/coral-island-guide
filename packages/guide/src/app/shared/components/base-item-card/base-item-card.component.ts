import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Item, MinimalItem } from '@ci/data-types';
import { DatabaseService } from '../../services/database.service';
import { addSpacesToPascalCase } from '@ci/util';
import { coerceBooleanProperty } from "@angular/cdk/coercion";

@Component({
    selector: 'app-base-item-card',
    templateUrl: './base-item-card.component.html',
    styleUrls: ['./base-item-card.component.scss'],
})
export class BaseItemCardComponent implements OnInit, OnChanges {
    @Input() item?: Item | MinimalItem;
    @Input() amount?: number;
    @Output() openDrawerChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    protected fetchedItem?: Item;
    protected addSpacesToPascalCase = addSpacesToPascalCase;

    constructor(private readonly _database: DatabaseService) {
    }

    _hideQualityGrid = false;

    @Input()
    get hideQualityGrid(): boolean {
        return this._hideQualityGrid;
    }

    set hideQualityGrid(value: boolean | number | string | null | undefined) {
        this._hideQualityGrid = coerceBooleanProperty(value);

    }

    ngOnInit(): void {
        this._setItem(this.item);
    }

    isItem(item: Item | MinimalItem): item is Item {
        return ('sellPrice' in item);
    }

    ngOnChanges(changes: SimpleChanges): void {
        this._setItem(changes['item'].currentValue);
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
