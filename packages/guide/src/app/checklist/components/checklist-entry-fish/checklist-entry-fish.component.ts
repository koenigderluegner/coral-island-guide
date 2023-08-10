import { Component, Input } from '@angular/core';
import { Fish } from "@ci/data-types";
import { ChecklistCategory } from "../../../core/enums/checklist-category.enum";

@Component({
    selector: 'app-checklist-entry-fish',
    templateUrl: './checklist-entry-fish.component.html',
})
export class ChecklistEntryFishComponent {

    @Input({required: true}) entry!: Fish;
    protected category = ChecklistCategory
}
