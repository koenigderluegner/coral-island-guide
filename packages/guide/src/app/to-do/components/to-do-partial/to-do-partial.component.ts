import { Component, ContentChild, inject, Input, TemplateRef } from '@angular/core';
import { ToDoCategory } from "../../../core/enums/todo-category.enum";
import { ToDoService } from "../../../core/services/to-do.service";

@Component({
    selector: 'app-to-do-partial',
    templateUrl: './to-do-partial.component.html',
})
export class ToDoPartialComponent<TData extends Array<unknown>> {

    @Input({required: true}) data!: TData;
    @Input() toDoId?: string | undefined;
    @Input({required: true}) dataToDoId: string | undefined;
    @Input({required: true}) title!: string;
    @Input({required: true}) category!: ToDoCategory;

    @ContentChild(TemplateRef) templateRef: TemplateRef<{ $implicit: TData }> | null = null;

    private _toDoService: ToDoService = inject(ToDoService);


    completeList() {
        this._toDoService.completeCategory(this.category)
    }
}
