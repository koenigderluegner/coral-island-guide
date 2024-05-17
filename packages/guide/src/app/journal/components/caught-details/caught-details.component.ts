import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Critter, Fish } from '@ci/data-types';
import { ToDoContext } from "../../../core/types/to-do-context.type";

@Component({
    selector: 'app-caught-details',
    templateUrl: './caught-details.component.html',
})
export class CaughtDetailsComponent implements OnInit, OnChanges {
    @Input({required: true}) critter!: Fish | Critter;

    protected toDoContext!: ToDoContext;

    ngOnInit() {
        this._setCategory();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['critter']) {
            this._setCategory()
        }
    }

    private _setCategory() {
        this.toDoContext = 'fishName' in this.critter
            ? "journal_fish"
            : this.critter.item.inventoryCategory.toLocaleLowerCase() === 'bug'
                ? "journal_insects"
                : "journal_critter"
    }
}
