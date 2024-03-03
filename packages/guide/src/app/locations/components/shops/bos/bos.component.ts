import { Component } from '@angular/core';
import { BaseShopComponent } from "../../base-shop/base-shop.component";
import { ShopName } from "@ci/data-types";

@Component({
    selector: 'app-bos',
    templateUrl: '../../base-shop/base-shop.component.html',
})
export class BosComponent extends BaseShopComponent {

    protected shopName: ShopName = "bos";

    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemData$(this.shopName);
    }
}
