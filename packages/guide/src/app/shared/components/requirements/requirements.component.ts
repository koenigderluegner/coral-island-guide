import { Component, Input } from '@angular/core';
import { Requirement } from "@ci/data-types";

@Component({
    selector: 'app-requirements',
    templateUrl: './requirements.component.html',
})
export class RequirementsComponent {

    @Input({required: true}) requirement!: Requirement

}
