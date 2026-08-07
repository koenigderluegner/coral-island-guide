import { Component, computed, inject, input, output, ChangeDetectionStrategy } from '@angular/core';
import { ToDoService } from "../../../core/services/to-do.service";
import { ToDoContext, ToDoContextDisplayNames } from "../../../core/types/to-do-context.type";
import { ToDo } from "../../../core/types/to-do.type";
import { ToDoFilterOptions } from "../../types/to-do-filter-options.type";
import { ItemEntry } from "../../../shared/types/item-entry.type";
import { ToDoEntryBaseComponent } from "../to-do-entry-base/to-do-entry-base.component";

@Component({
    selector: 'app-to-do-partial',
    templateUrl: './to-do-partial.component.html',
    host: {
        '[class.hidden]': 'hidden()'
    },
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        ToDoEntryBaseComponent
    ]
})
export class ToDoPartialComponent {
    readonly entrySelected = output<ItemEntry>()
    readonly context = input.required<ToDoContext | 'uncategorized'>();
    readonly toDoId = input<ToDoFilterOptions[]>();
    readonly hidden = computed(() => !this.toDoId()?.includes(this.context()) || !this.data.length)
    protected readonly ToDoContextDisplayNames = ToDoContextDisplayNames;
    protected readonly toDoService: ToDoService = inject(ToDoService);

    get data(): ToDo[] {
        return this.toDoService.getCategoryList(this.context() === 'uncategorized' ? undefined : this.context());
    }

    completeList() {
        this.toDoService.completeCategory(this.context() === 'uncategorized' ? undefined : this.context())
    }

}
