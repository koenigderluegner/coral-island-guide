import { Component, input } from '@angular/core';
import { ItemProcessingRefinement, Quality, UiIcon } from "@ci/data-types";

@Component({
    selector: 'app-refinements-list',
    templateUrl: './refinements-list.component.html',
    styleUrls: ['./refinements-list.component.scss'],
    standalone: false
})
export class RefinementsListComponent {

    readonly refinements = input<ItemProcessingRefinement[]>();
    protected quality = Quality;
    protected uiIcon = UiIcon;

}
