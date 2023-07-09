import { Component, Input } from '@angular/core';
import { Offering } from "@ci/data-types";
import { ChecklistCategory } from "../../../core/enums/checklist-category.enum";

@Component({
    selector: 'app-checklist-entry-offering',
    templateUrl: './checklist-entry-offering.component.html',
})
export class ChecklistEntryOfferingComponent {

    @Input({required: true}) entry!: Offering;
    protected category = ChecklistCategory.OFFERINGS


}
