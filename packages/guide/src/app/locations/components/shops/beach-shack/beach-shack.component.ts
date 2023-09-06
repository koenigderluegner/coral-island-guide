import { Component } from '@angular/core';
import { BaseShopComponent } from "../../base-shop/base-shop.component";
import { ShopName } from "@ci/data-types";

@Component({
    selector: 'app-beach-shack',
    templateUrl: '../../base-shop/base-shop.component.html',
})
export class BeachShackComponent extends BaseShopComponent {

    protected shopName: ShopName = "beach-shack";

    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemData$(this.shopName);
        this.openingHours$ = this._database.fetchOpeningHours$(this.shopName);
    }
}
