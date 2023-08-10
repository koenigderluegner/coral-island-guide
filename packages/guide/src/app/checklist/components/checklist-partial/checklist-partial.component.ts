import { Component, ContentChild, inject, Input, TemplateRef } from '@angular/core';
import { ChecklistCategory } from "../../../core/enums/checklist-category.enum";
import { ChecklistService } from "../../../core/services/checklist.service";

@Component({
    selector: 'app-checklist-partial',
    templateUrl: './checklist-partial.component.html',
})
export class ChecklistPartialComponent<TData extends Array<unknown>> {

    @Input({required: true}) data!: TData;
    @Input() checklistId?: string | undefined;
    @Input({required: true}) dataChecklistId: string | undefined;
    @Input({required: true}) title!: string;
    @Input({required: true}) category!: ChecklistCategory;

    @ContentChild(TemplateRef) templateRef: TemplateRef<{ $implicit: TData }> | null = null;

    private _checklist: ChecklistService = inject(ChecklistService);


    completeList() {
        this._checklist.completeCategory(this.category)
    }
}
