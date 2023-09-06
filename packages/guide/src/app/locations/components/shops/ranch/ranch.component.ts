import { Component } from '@angular/core';
import { BaseShopComponent } from "../../base-shop/base-shop.component";
import { ShopName } from "@ci/data-types";

@Component({
    selector: 'app-ranch',
    templateUrl: '../../base-shop/base-shop.component.html',
})
export class RanchComponent extends BaseShopComponent {

    protected shopName: ShopName = "ranch";

    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemData$(this.shopName);
        this.openingHours$ = this._database.fetchOpeningHours$(this.shopName);
    }
}
