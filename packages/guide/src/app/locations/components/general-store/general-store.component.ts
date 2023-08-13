import { Component } from '@angular/core';
import { BaseSelectableContainerComponent } from "../../../shared/components/base-selectable-container/base-selectable-container.component";
import { OpeningHours, ShopItemData } from "@ci/data-types";
import { Observable } from "rxjs";
import { UiIcon } from "../../../shared/enums/ui-icon.enum";

@Component({
    selector: 'app-general-store',
    templateUrl: './general-store.component.html',
})
export class GeneralStoreComponent extends BaseSelectableContainerComponent<ShopItemData> {

    protected shopItemData$: Observable<ShopItemData[]>;
    protected uiIcon = UiIcon;
    protected openingHours$: Observable<Record<string, OpeningHours>>;


    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemData$("general-store");
        this.openingHours$ = this._database.fetchOpeningHours$("general-store");
    }

}
