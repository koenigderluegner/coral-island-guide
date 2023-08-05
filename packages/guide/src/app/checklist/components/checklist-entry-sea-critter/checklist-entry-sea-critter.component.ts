import { Component, Input } from '@angular/core';
import { Critter } from "@ci/data-types";
import { ChecklistCategory } from "../../../core/enums/checklist-category.enum";

@Component({
    selector: 'app-checklist-sea-critter',
    templateUrl: './checklist-entry-sea-critter.component.html',
})
export class ChecklistEntrySeaCritterComponent {
    @Input({required: true}) entry!: Critter;
    protected category = ChecklistCategory
}
