import { Component, Input } from '@angular/core';
import { RequirementEntry } from "@ci/data-types";

@Component({
    selector: 'app-requirements-list',
    templateUrl: './requirements-list.component.html',
})
export class RequirementsListComponent {
    @Input() requirements?: RequirementEntry
}
