import { Component } from '@angular/core';
import { BaseShopComponent } from "../../base-shop/base-shop.component";
import { ShopName } from "@ci/data-types";

@Component({
    selector: 'app-concerned-monkey',
    templateUrl: '../../base-shop/base-shop.component.html',
})
export class ConcernedMonkeyComponent extends BaseShopComponent {

    protected shopName: ShopName = "concerned-monkey";

    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemData$(this.shopName);
    }
}
