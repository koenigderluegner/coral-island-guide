import { Component, computed, inject, input, output } from '@angular/core';
import { ToDoService } from "../../../core/services/to-do.service";
import { ToDoContext, ToDoContextDisplayNames } from "../../../core/types/to-do-context.type";
import { ToDo } from "../../../core/types/to-do.type";
import { ToDoFilterOptions } from "../../types/to-do-filter-options.type";
import { animate, style, transition, trigger } from "@angular/animations";
import { ItemEntry } from "../../../shared/types/item-entry.type";

@Component({
    selector: 'app-to-do-partial',
    templateUrl: './to-do-partial.component.html',
    animations: [
        trigger('leaveAnimation', [
            transition(':leave', [
                style({height: '*', opacity: 1}),
                animate('200ms ease-in', style({height: 0, opacity: 0}))
            ])
        ])
    ],
    host: {
        '[class.hidden]': 'hidden()'
    },
    standalone: false
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
