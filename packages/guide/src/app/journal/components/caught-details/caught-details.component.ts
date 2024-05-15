import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Critter, Fish } from '@ci/data-types';
import { CaughtComponent } from "../caught/caught.component";
import { ToDoContext } from "../../../core/types/to-do-context.type";

@Component({
    selector: 'app-caught-details',
    templateUrl: './caught-details.component.html',
})
export class CaughtDetailsComponent implements OnInit, OnChanges {
    @Input({required: true}) critter!: Fish | Critter;
    @Input() registerToToDo?: CaughtComponent['registerToToDo'];

    protected toDoCategory!: ToDoContext;

    ngOnInit() {
        this._setCategory();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['critter']) {
            this._setCategory()
        }
    }

    private _setCategory() {
        this.toDoCategory = 'fishName' in this.critter
            ? "journal_fish"
            : this.critter.item.inventoryCategory.toLocaleLowerCase() === 'bug'
                ? "journal_insects"
                : "journal_critter"
    }
}
