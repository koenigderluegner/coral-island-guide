import { Component, input } from '@angular/core';
import { Requirement } from "@ci/data-types";
import { ItemIconComponent } from "../item-icon/item-icon.component";
import { RouterLink } from "@angular/router";
import { InlineMinimalItemComponent } from "../inline-minimal-item/inline-minimal-item.component";
import { IngameDatePipe } from "../../pipes/ingame-date.pipe";

@Component({
    selector: 'app-requirements',
    templateUrl: './requirements.component.html',

    imports: [
        ItemIconComponent,
        RouterLink,
        InlineMinimalItemComponent,
        IngameDatePipe
    ]
})
export class RequirementsComponent {
    readonly requirement = input.required<Requirement>()

}
