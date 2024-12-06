import { Component } from '@angular/core';
import { ShopName } from "@ci/data-types";
import { BaseShopComponent } from "../../base-shop/base-shop.component";

@Component({
    selector: 'app-blacksmith',
    templateUrl: '../../base-shop/base-shop.component.html',
    standalone: false
})
export class BlacksmithComponent extends BaseShopComponent {

    protected shopName: ShopName = "blacksmith";

    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemData$(this.shopName);
        this.openingHours$ = this._database.fetchOpeningHours$(this.shopName);
        this.itemProcessing$ = this._database.fetchShopProcessItems$(this.shopName);
        this.itemUpgrade$ = this._database.fetchItemUpgradeData$(this.shopName);
    }
}
