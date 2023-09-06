import { Component } from '@angular/core';
import { ShopName } from "@ci/data-types";
import { BaseShopComponent } from "../../base-shop/base-shop.component";

@Component({
    selector: 'app-merfolk-oracle-tail-store',
    templateUrl: '../../base-shop/base-shop.component.html',
})
export class MerfolkOracleTailStoreComponent extends BaseShopComponent {

    protected shopName: ShopName = "merfolk-oracle-tail-store";

    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemData$(this.shopName);
    }
}
