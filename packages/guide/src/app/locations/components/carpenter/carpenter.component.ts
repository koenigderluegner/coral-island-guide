import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { OpeningHours, ShopItemData } from "@ci/data-types";
import { UiIcon } from "../../../shared/enums/ui-icon.enum";
import { BaseSelectableContainerComponent } from "../../../shared/components/base-selectable-container/base-selectable-container.component";

@Component({
    selector: 'app-carpenter',
    templateUrl: './carpenter.component.html',
})
export class CarpenterComponent extends BaseSelectableContainerComponent<ShopItemData> {
    protected shopItemData$: Observable<ShopItemData[]>;
    protected uiIcon = UiIcon;
    protected openingHours$: Observable<Record<string, OpeningHours>>;


    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemData$("carpenter");
        this.openingHours$ = this._database.fetchOpeningHours$("carpenter");
    }

}
