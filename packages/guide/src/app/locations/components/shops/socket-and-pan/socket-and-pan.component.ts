import { Component } from '@angular/core';
import { BaseShopComponent } from "../../base-shop/base-shop.component";
import { ShopName } from "@ci/data-types";

@Component({
    selector: 'app-socket-and-pan',
    templateUrl: '../../base-shop/base-shop.component.html',
})
export class SocketAndPanComponent extends BaseShopComponent {

    protected shopName: ShopName = "socket-and-pan";

    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemData$(this.shopName);
    }
}
