import { Component } from '@angular/core';
import { ShopName } from "@ci/data-types";
import { BaseShopComponent } from "../base-shop/base-shop.component";
import { LocationsModule } from "../../locations.module";
import { SharedModule } from "../../../shared/shared.module";
import { AsyncPipe, CommonModule } from "@angular/common";

@Component({
    selector: 'app-tidal-threads',
    templateUrl: '../base-shop/base-shop.component.html',
    standalone: true,
    imports: [LocationsModule, SharedModule, AsyncPipe, CommonModule]
})
export class TidalThreadsComponent extends BaseShopComponent {

    protected shopName: ShopName = "tidal-threads";

    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemData$(this.shopName);
        this.openingHours$ = this._database.fetchOpeningHours$(this.shopName);
    }
}
