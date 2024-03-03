import { Component } from '@angular/core';
import { ShopName } from "@ci/data-types";
import { BaseShopComponent } from "../../base-shop/base-shop.component";

@Component({
    selector: 'app-carpenter',
    templateUrl: '../../base-shop/base-shop.component.html',
})
export class CarpenterComponent extends BaseShopComponent {

    override upgradeHeaderText = 'Buildings';
    protected shopName: ShopName = "carpenter";

    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemData$(this.shopName);
        this.openingHours$ = this._database.fetchOpeningHours$(this.shopName);
        this.itemUpgrade$ = this._database.fetchItemUpgradeData$(this.shopName);
    }
}
