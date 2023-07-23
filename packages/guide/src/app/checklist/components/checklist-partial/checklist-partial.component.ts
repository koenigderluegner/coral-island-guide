import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'app-checklist-partial',
    templateUrl: './checklist-partial.component.html',
})
export class ChecklistPartialComponent<TData extends Array<unknown>> {

    @Input({required: true}) data!: TData;
    @Input() checklistId?: string | undefined;
    @Input({required: true}) dataChecklistId: string | undefined;
    @Input({required: true}) title!: string;

    @ContentChild(TemplateRef) templateRef: TemplateRef<{ $implicit: TData }> | null = null;

}
