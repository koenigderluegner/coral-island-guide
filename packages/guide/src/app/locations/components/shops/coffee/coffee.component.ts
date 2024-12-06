import { Component } from '@angular/core';
import { ShopName } from "@ci/data-types";
import { BaseShopComponent } from "../../base-shop/base-shop.component";

@Component({
    selector: 'app-coffee',
    templateUrl: '../../base-shop/base-shop.component.html',
    standalone: false
})
export class CoffeeComponent extends BaseShopComponent {


    protected shopName: ShopName = "coffee";

    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemData$(this.shopName);
    }
}
