import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Item, MinimalItem } from '@ci/data-types';
import { DatabaseService } from '../../services/database.service';
import { addSpacesToPascalCase } from '@ci/util';

@Component({
    selector: 'app-base-item-card',
    templateUrl: './base-item-card.component.html',
    styleUrls: ['./base-item-card.component.scss'],
})
export class BaseItemCardComponent implements OnInit, OnChanges {
    @Input() item?: Item | MinimalItem;
    @Input() amount?: number;
    protected fetchedItem?: Item;
    protected addSpacesToPascalCase = addSpacesToPascalCase;

    constructor(private readonly _database: DatabaseService) {
    }

    ngOnInit(): void {
        this._setItem(this.item);
    }

    private _setItem(item: Item | MinimalItem | undefined): void {
        if (!item) return;
        if (!this.isItem(item)) {
            this.fetchedItem = this._database.getItems().find(i => i.id === item.id);
        } else {
            this.fetchedItem = item;
        }
    }


    isItem(item: Item | MinimalItem): item is Item {
        return ('sellPrice' in item);
    }

    ngOnChanges(changes: SimpleChanges): void {
        this._setItem(changes['item'].currentValue);
    }


}
