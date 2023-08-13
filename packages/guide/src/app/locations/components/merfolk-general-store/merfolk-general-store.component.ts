import { Component } from '@angular/core';
import { BaseSelectableContainerComponent } from "../../../shared/components/base-selectable-container/base-selectable-container.component";
import { ShopItemData } from "@ci/data-types";
import { Observable } from "rxjs";
import { UiIcon } from "../../../shared/enums/ui-icon.enum";

@Component({
    selector: 'app-merfolk-general-store',
    templateUrl: './merfolk-general-store.component.html',
})
export class MerfolkGeneralStoreComponent extends BaseSelectableContainerComponent<ShopItemData> {

    protected shopItemData$: Observable<ShopItemData[]>;
    protected uiIcon = UiIcon;


    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemData$("merfolk-general-store");
    }

}
