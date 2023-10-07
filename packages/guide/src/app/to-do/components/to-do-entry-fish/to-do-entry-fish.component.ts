import { Component, Input } from '@angular/core';
import { Fish } from "@ci/data-types";
import { ToDoCategory } from "../../../core/enums/todo-category.enum";

@Component({
    selector: 'app-to-do-entry-fish',
    templateUrl: './to-do-entry-fish.component.html',
})
export class ToDoEntryFishComponent {

    @Input({required: true}) entry!: Fish;
    protected category = ToDoCategory
}
