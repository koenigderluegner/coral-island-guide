import { Component } from '@angular/core';
import { ShopName } from "@ci/data-types";
import { BaseShopComponent } from "../base-shop/base-shop.component";
import { LocationsModule } from "../../locations.module";
import { SharedModule } from "../../../shared/shared.module";
import { AsyncPipe, CommonModule } from "@angular/common";

@Component({
    selector: 'app-taco-truck',
    templateUrl: '../base-shop/base-shop.component.html',
    standalone: true,
    imports: [LocationsModule, SharedModule, AsyncPipe, CommonModule]
})
export class TacoTruckComponent extends BaseShopComponent {

    protected shopName: ShopName = "taco-truck";

    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemData$(this.shopName);
    }
}
