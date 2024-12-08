import { Component, input, Input } from '@angular/core';
import { RequirementEntry } from "@ci/data-types";

@Component({
    selector: 'app-requirements-list',
    templateUrl: './requirements-list.component.html',
    standalone: false
})
export class RequirementsListComponent {
    readonly requirements  = input.required<RequirementEntry>()
}
