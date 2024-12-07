import { Component, input, Input } from '@angular/core';
import { Requirement } from "@ci/data-types";

@Component({
    selector: 'app-requirements',
    templateUrl: './requirements.component.html',
    standalone: false
})
export class RequirementsComponent {
    readonly requirement = input.required<Requirement>()

}
