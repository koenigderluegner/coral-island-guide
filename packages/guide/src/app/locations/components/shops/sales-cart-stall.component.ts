import { Component } from '@angular/core';
import { BaseFurnitureStoreComponent } from "../base-furniture-store/base-furniture-store.component";
import { ShopName } from "@ci/data-types";
import { SharedModule } from "../../../shared/shared.module";
import { LocationsModule } from "../../locations.module";
import { AsyncPipe } from "@angular/common";

@Component({
    selector: 'app-sales-cart-stall',
    standalone: true,
    imports: [
        SharedModule,
        LocationsModule,
        AsyncPipe
    ],
    templateUrl: '../base-furniture-store/base-furniture-store.component.html'
})
export class SalesCartStallComponent extends BaseFurnitureStoreComponent {
    protected shopName: ShopName = "sales-cart-stall";

    constructor() {
        super();
        this.shopItemDataIndoor$ = this._database.fetchShopItemData$(this.shopName + '-indoor' as ShopName);
        this.shopItemDataOutdoor$ = this._database.fetchShopItemData$(this.shopName + '-outdoor' as ShopName);
        this.openingHours$ = this._database.fetchOpeningHours$(this.shopName);

    }


}
