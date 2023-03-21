import { Component, Input } from '@angular/core';
import { ItemProcessingRefinement, Quality } from "@ci/data-types";
import { UiIcon } from "../../enums/ui-icon.enum";

@Component({
    selector: 'app-refinements-list',
    templateUrl: './refinements-list.component.html',
    styleUrls: ['./refinements-list.component.scss'],
})
export class RefinementsListComponent {

    @Input() refinements?: ItemProcessingRefinement[];
    protected quality = Quality;
    protected uiIcon = UiIcon;

}
