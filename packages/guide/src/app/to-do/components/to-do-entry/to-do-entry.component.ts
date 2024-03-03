import { Component, Input } from '@angular/core';
import { Offering } from "@ci/data-types";
import { ToDoCategory } from "../../../core/enums/todo-category.enum";

@Component({
    selector: 'app-to-do-entry',
    templateUrl: './to-do-entry.component.html',
})
export class ToDoEntryComponent {

    @Input({required: true}) type!: ToDoCategory;
    @Input({required: true}) entry!: Offering;

    protected toDoCategory = ToDoCategory


}
