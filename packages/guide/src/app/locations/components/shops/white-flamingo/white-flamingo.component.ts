import { Component } from '@angular/core';
import { ShopName } from "@ci/data-types";
import { BaseShopComponent } from "../../base-shop/base-shop.component";

@Component({
    selector: 'app-white-flamingo',
    templateUrl: '../../base-shop/base-shop.component.html',
})
export class WhiteFlamingoComponent extends BaseShopComponent {


    protected shopName: ShopName = "white-flamingo";

    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemData$(this.shopName);
    }
}
