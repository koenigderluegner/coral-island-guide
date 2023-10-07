import { Component, Input } from '@angular/core';
import { Offering } from "@ci/data-types";
import { ToDoCategory } from "../../../core/enums/todo-category.enum";

@Component({
    selector: 'app-to-do-entry-offering',
    templateUrl: './to-do-entry-offering.component.html',
})
export class ToDoEntryOfferingComponent {

    @Input({required: true}) entry!: Offering;
    protected category = ToDoCategory.OFFERINGS


}
