import { Component } from '@angular/core';
import { BaseSelectableContainerComponent } from "../../../shared/components/base-selectable-container/base-selectable-container.component";
import { MeritExchangeShopData, UiIcon } from "@ci/data-types";
import { Observable } from "rxjs";

@Component({
    selector: 'app-merit-shop',
    templateUrl: './merit-shop.component.html',
    standalone: false
})
export class MeritShopComponent extends BaseSelectableContainerComponent<MeritExchangeShopData> {

    protected shopItemData$: Observable<MeritExchangeShopData[]>;
    protected uiIcon = UiIcon;


    constructor() {
        super();
        this.shopItemData$ = this._database.fetchMeritExchangeShopData$();
    }
}
