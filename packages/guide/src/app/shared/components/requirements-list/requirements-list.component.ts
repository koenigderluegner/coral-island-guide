import { Component, input } from '@angular/core';
import { RequirementEntry } from "@ci/data-types";
import { RequirementsComponent } from "../requirements/requirements.component";

@Component({
    selector: 'app-requirements-list',
    templateUrl: './requirements-list.component.html',

    imports: [
        RequirementsComponent
    ]
})
export class RequirementsListComponent {
    readonly requirements = input.required<RequirementEntry>()
}
