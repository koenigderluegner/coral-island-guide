import { Component, Input } from '@angular/core';
import { Critter } from "@ci/data-types";
import { ToDoCategory } from "../../../core/enums/todo-category.enum";

@Component({
    selector: 'app-to-do-sea-critter',
    templateUrl: './to-do-entry-sea-critter.component.html',
})
export class ToDoEntrySeaCritterComponent {
    @Input({required: true}) entry!: Critter;
    protected category = ToDoCategory
}
