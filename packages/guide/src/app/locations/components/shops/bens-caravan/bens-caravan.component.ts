import { Component } from '@angular/core';
import { BaseShopComponent } from "../../base-shop/base-shop.component";
import { ShopName } from "@ci/data-types";

@Component({
    selector: 'app-bens-caravan',
    templateUrl: '../../base-shop/base-shop.component.html',
    standalone: false
})
export class BensCaravanComponent extends BaseShopComponent {

    protected shopName: ShopName = "bens-caravan";

    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemData$(this.shopName);
    }
}
