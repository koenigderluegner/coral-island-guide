import { Component, Input } from '@angular/core';
import { Offering } from "@ci/data-types";

@Component({
    selector: 'app-checklist-entry-offering',
    templateUrl: './checklist-entry-offering.component.html',
})
export class ChecklistEntryOfferingComponent {

    @Input({required: true}) entry!: Offering;


}
