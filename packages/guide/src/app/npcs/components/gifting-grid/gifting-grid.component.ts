import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { GiftPreferences } from "@ci/data-types";
import { preferencesMap } from "../../../shared/constants/preference-map.const";

@Component({
    selector: 'app-gifting-grid',
    templateUrl: './gifting-grid.component.html',
    styleUrls: ['./gifting-grid.component.scss',],
    encapsulation: ViewEncapsulation.None
})
export class GiftingGridComponent {
    @HostBinding('class.gifting-preference-grid') setCssClass = true;
    @Input({required: true}) preferences!: GiftPreferences

    protected preferencesMap = preferencesMap
}
