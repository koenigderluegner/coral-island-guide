import { Component, OnChanges, OnInit, SimpleChanges, input } from '@angular/core';
import { Critter, Fish } from '@ci/data-types';
import { ToDoContext } from "../../../core/types/to-do-context.type";

@Component({
    selector: 'app-caught-details',
    templateUrl: './caught-details.component.html',
    standalone: false
})
export class CaughtDetailsComponent implements OnInit, OnChanges {
    readonly critter = input.required<Fish | Critter>();

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
        const critter = this.critter();
        this.toDoContext = 'fishName' in critter
            ? "journal_fish"
            : critter.item.inventoryCategory.toLocaleLowerCase() === 'bug'
                ? "journal_insects"
                : "journal_critter"
    }
}
