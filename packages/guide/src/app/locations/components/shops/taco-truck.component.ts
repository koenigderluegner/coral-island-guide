import { Component } from '@angular/core';
import { ShopName } from "@ci/data-types";
import { BaseShopComponent } from "../base-shop/base-shop.component";
import { LocationsModule } from "../../locations.module";
import { SharedModule } from "../../../shared/shared.module";
import { AsyncPipe, CommonModule } from "@angular/common";
import { UiIconComponent } from "../../../shared/components/ui-icon/ui-icon.component";

@Component({
    selector: 'app-taco-truck',
    templateUrl: '../base-shop/base-shop.component.html',
    imports: [LocationsModule, SharedModule, AsyncPipe, CommonModule, UiIconComponent]
})
export class TacoTruckComponent extends BaseShopComponent {

    protected shopName: ShopName = "taco-truck";

    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemData$(this.shopName);
    }
}
