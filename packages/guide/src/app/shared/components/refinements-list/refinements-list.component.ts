import { Component, input } from '@angular/core';
import { ItemProcessingRefinement, Quality, UiIcon } from "@ci/data-types";
import { RarityIconComponent } from "../rarity-icon/rarity-icon.component";
import { UiIconComponent } from "../ui-icon/ui-icon.component";
import { ProcessingTimeComponent } from "../processing-time/processing-time.component";

@Component({
    selector: 'app-refinements-list',
    templateUrl: './refinements-list.component.html',
    styleUrls: ['./refinements-list.component.scss'],

    imports: [
        RarityIconComponent,
        UiIconComponent,
        ProcessingTimeComponent
    ]
})
export class RefinementsListComponent {

    readonly refinements = input<ItemProcessingRefinement[]>();
    protected quality = Quality;
    protected uiIcon = UiIcon;

}
