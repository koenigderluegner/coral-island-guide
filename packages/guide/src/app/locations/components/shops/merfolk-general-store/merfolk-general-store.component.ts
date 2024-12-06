import { Component } from '@angular/core';
import { ShopName } from "@ci/data-types";
import { BaseShopComponent } from "../../base-shop/base-shop.component";

@Component({
    selector: 'app-merfolk-general-store',
    templateUrl: '../../base-shop/base-shop.component.html',
    standalone: false
})
export class MerfolkGeneralStoreComponent extends BaseShopComponent {

    protected shopName: ShopName = "merfolk-general-store";

    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemData$(this.shopName);
    }
}
