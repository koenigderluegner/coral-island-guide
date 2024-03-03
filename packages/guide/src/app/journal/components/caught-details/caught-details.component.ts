import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Critter, Fish } from '@ci/data-types';
import { CaughtComponent } from "../caught/caught.component";
import { ToDoCategory } from "../../../core/enums/todo-category.enum";

@Component({
    selector: 'app-caught-details',
    templateUrl: './caught-details.component.html',
})
export class CaughtDetailsComponent implements OnInit, OnChanges {
    @Input({required: true}) critter!: Fish | Critter;
    @Input() registerToToDo?: CaughtComponent['registerToToDo'];

    protected toDoCategory!: ToDoCategory;

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
            ? ToDoCategory.JOURNAL_FISH
            : this.critter.item.inventoryCategory.toLocaleLowerCase() === 'bug'
                ? ToDoCategory.JOURNAL_INSECTS
                : ToDoCategory.JOURNAL_CRITTER
    }
}
