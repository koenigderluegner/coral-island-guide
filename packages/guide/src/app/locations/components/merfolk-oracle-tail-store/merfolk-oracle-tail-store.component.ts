import { Component } from '@angular/core';
import { BaseSelectableContainerComponent } from "../../../shared/components/base-selectable-container/base-selectable-container.component";
import { ShopItemData } from "@ci/data-types";
import { Observable } from "rxjs";
import { UiIcon } from "../../../shared/enums/ui-icon.enum";

@Component({
    selector: 'app-merfolk-oracle-tail-store',
    templateUrl: './merfolk-oracle-tail-store.component.html',
})
export class MerfolkOracleTailStoreComponent extends BaseSelectableContainerComponent<ShopItemData> {

    protected shopItemData$: Observable<ShopItemData[]>;
    protected uiIcon = UiIcon;


    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemData$("merfolk-oracle-tail-store");
    }

}
