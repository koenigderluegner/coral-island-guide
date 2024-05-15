import { Component, ContentChild, HostBinding, inject, Input, TemplateRef } from '@angular/core';
import { ToDoService } from "../../../core/services/to-do.service";
import { ToDoContext } from "../../../core/types/to-do-context.type";

@Component({
    selector: 'app-to-do-partial',
    templateUrl: './to-do-partial.component.html',
})
export class ToDoPartialComponent<TData extends Array<unknown>> {

    @Input({required: true}) data!: TData;
    @Input() toDoId?: (string | undefined)[] | undefined;
    @Input({required: true}) dataToDoId: string | undefined;
    @Input({required: true}) title!: string;
    @Input({required: true}) category!: ToDoContext;
    @ContentChild(TemplateRef) templateRef: TemplateRef<{ $implicit: TData }> | null = null;
    private _toDoService: ToDoService = inject(ToDoService);

    @HostBinding('class.hidden') get hidden(): boolean {
        return !this.toDoId?.includes(this.category) || !this.data.length
    }

    completeList() {
        this._toDoService.completeCategory(this.category)
    }
}
