import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { GiftPreferences, MinimalItem } from "@ci/data-types";
import { preferencesMap } from "../../../shared/constants/preference-map.const";

@Component({
    selector: 'app-gifting-grid',
    templateUrl: './gifting-grid.component.html',
    styleUrls: ['./gifting-grid.component.scss',],
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'gifting-preference-grid'
    },
    standalone: false
})
export class GiftingGridComponent {

    readonly preferences = input.required<GiftPreferences>()
    readonly itemClicked = output<MinimalItem>();
    protected preferencesMap = preferencesMap
}
