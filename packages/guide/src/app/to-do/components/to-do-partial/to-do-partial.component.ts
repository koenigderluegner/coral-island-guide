import { Component, HostBinding, inject, Input } from '@angular/core';
import { ToDoService } from "../../../core/services/to-do.service";
import { ToDoContext, ToDoContextDisplayNames } from "../../../core/types/to-do-context.type";
import { ToDo } from "../../../core/types/to-do.type";
import { ToDoFilterOptions } from "../../types/to-do-filter-options.type";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
    selector: 'app-to-do-partial',
    templateUrl: './to-do-partial.component.html',
    animations: [
        trigger(
            'leaveAnimation',
            [
                transition(
                    ':leave',
                    [
                        style({height: '*', opacity: 1}),
                        animate('200ms ease-in',
                            style({height: 0, opacity: 0}))
                    ]
                )
            ]
        )
    ]
})
export class ToDoPartialComponent {

    @Input({required: true}) context!: ToDoContext | 'uncategorized';
    @Input() toDoId?: ToDoFilterOptions[] | undefined;
    protected readonly ToDoContextDisplayNames = ToDoContextDisplayNames;
    protected _toDoService: ToDoService = inject(ToDoService);

    get data(): ToDo[] {
        return this._toDoService.getCategoryList(this.context === 'uncategorized' ? undefined : this.context);
    }

    @HostBinding('class.hidden') get hidden(): boolean {
        return !this.toDoId?.includes(this.context) || !this.data.length
    }

    completeList() {
        this._toDoService.completeCategory(this.context === 'uncategorized' ? undefined : this.context)
    }

}
