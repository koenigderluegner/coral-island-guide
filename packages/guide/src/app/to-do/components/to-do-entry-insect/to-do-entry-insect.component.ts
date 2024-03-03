import { Component, Input } from '@angular/core';
import { Critter } from "@ci/data-types";
import { ToDoCategory } from "../../../core/enums/todo-category.enum";

@Component({
    selector: 'app-to-do-entry-insect',
    templateUrl: './to-do-entry-insect.component.html',
})
export class ToDoEntryInsectComponent {
    @Input({required: true}) entry!: Critter;
    protected category = ToDoCategory
}
