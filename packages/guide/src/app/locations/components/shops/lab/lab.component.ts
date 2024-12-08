import { Component } from '@angular/core';
import { ShopName } from "@ci/data-types";
import { BaseShopComponent } from "../../base-shop/base-shop.component";

@Component({
    selector: 'app-lab',
    templateUrl: '../../base-shop/base-shop.component.html',
    standalone: false
})
export class LabComponent extends BaseShopComponent {

    protected shopName: ShopName = "lab";

    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemData$("lab");
        this.openingHours$ = this._database.fetchOpeningHours$("lab");
        this.itemProcessing$ = this._database.fetchShopProcessItems$("lab");
        this.itemUpgrade$ = this._database.fetchItemUpgradeData$("lab");
    }

}
