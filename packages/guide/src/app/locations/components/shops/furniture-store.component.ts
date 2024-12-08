import { Component } from '@angular/core';
import { SharedModule } from "../../../shared/shared.module";
import { LocationsModule } from "../../locations.module";
import { AsyncPipe } from "@angular/common";
import { ShopName } from "@ci/data-types";
import { BaseFurnitureStoreComponent } from "../base-furniture-store/base-furniture-store.component";
import { UiIconComponent } from "../../../shared/components/ui-icon/ui-icon.component";

@Component({
    selector: 'app-furniture-store',
    imports: [
        SharedModule,
        LocationsModule,
        AsyncPipe,
        UiIconComponent
    ],
    templateUrl: '../base-furniture-store/base-furniture-store.component.html'
})
export class FurnitureStoreComponent extends BaseFurnitureStoreComponent {
    protected shopName: ShopName = "furniture-store";

    constructor() {
        super();
        this.shopItemDataIndoor$ = this._database.fetchShopItemData$(this.shopName + '-indoor' as ShopName);
        this.shopItemDataOutdoor$ = this._database.fetchShopItemData$(this.shopName + '-outdoor' as ShopName);
        this.openingHours$ = this._database.fetchOpeningHours$(this.shopName);

    }
}
