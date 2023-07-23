import { Component, Input } from '@angular/core';
import { Critter } from "@ci/data-types";
import { ChecklistCategory } from "../../../core/enums/checklist-category.enum";

@Component({
    selector: 'app-checklist-entry-insect',
    templateUrl: './checklist-entry-insect.component.html',
})
export class ChecklistEntryInsectComponent {
    @Input({required: true}) entry!: Critter;
    protected category = ChecklistCategory
}
