import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { GiftPreferences, MinimalItem } from "@ci/data-types";
import { preferencesMap } from "../../../shared/constants/preference-map.const";
import { UiIconComponent } from "../../../shared/components/ui-icon/ui-icon.component";
import { InlineMinimalItemComponent } from "../../../shared/components/inline-minimal-item/inline-minimal-item.component";
import { AddSpacesToPascalCasePipe } from "../../../shared/pipes/add-spaces-to-pascal-case.pipe";

@Component({
    selector: 'app-gifting-grid',
    templateUrl: './gifting-grid.component.html',
    styleUrls: ['./gifting-grid.component.scss',],
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'gifting-preference-grid'
    },

    imports: [
        UiIconComponent,
        InlineMinimalItemComponent,
        AddSpacesToPascalCasePipe
    ]
})
export class GiftingGridComponent {

    readonly preferences = input.required<GiftPreferences>()
    readonly itemClicked = output<MinimalItem>();
    protected preferencesMap = preferencesMap
}
