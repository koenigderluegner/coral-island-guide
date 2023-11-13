import { Component } from '@angular/core';
import { ShopName } from "@ci/data-types";
import { BaseShopComponent } from "../../base-shop/base-shop.component";

@Component({
    selector: 'app-tavern',
    templateUrl: '../../base-shop/base-shop.component.html',
})
export class TavernComponent extends BaseShopComponent {


    protected shopName: ShopName = "tavern";

    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemData$(this.shopName);
    }
}
