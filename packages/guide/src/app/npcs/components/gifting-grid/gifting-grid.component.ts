import { Component, HostBinding, input, output, ViewEncapsulation } from '@angular/core';
import { GiftPreferences, MinimalItem } from "@ci/data-types";
import { preferencesMap } from "../../../shared/constants/preference-map.const";

@Component({
    selector: 'app-gifting-grid',
    templateUrl: './gifting-grid.component.html',
    styleUrls: ['./gifting-grid.component.scss',],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class GiftingGridComponent {
    @HostBinding('class.gifting-preference-grid') setCssClass = true;

    readonly preferences = input.required<GiftPreferences>()
    readonly itemClicked = output<MinimalItem>();
    protected preferencesMap = preferencesMap
}
