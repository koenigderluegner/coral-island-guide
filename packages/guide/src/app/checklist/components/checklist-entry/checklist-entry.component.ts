import { Component, Input } from '@angular/core';
import { Offering } from "@ci/data-types";
import { ChecklistCategory } from "../../../core/enums/checklist-category.enum";

@Component({
    selector: 'app-checklist-entry',
    templateUrl: './checklist-entry.component.html',
})
export class ChecklistEntryComponent {

    @Input({required: true}) type!: ChecklistCategory;
    @Input({required: true}) entry!: Offering;

    protected checklistCategory = ChecklistCategory


}
