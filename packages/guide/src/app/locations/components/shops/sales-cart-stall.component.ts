import { Component } from '@angular/core';
import { BaseFurnitureStoreComponent } from "../base-furniture-store/base-furniture-store.component";
import { ShopName } from "@ci/data-types";
import { AsyncPipe } from "@angular/common";
import { UiIconComponent } from "../../../shared/components/ui-icon/ui-icon.component";
import { ShopItemDataTableComponent } from "../tables/shop-item-data-table/shop-item-data-table.component";
import { DataFilterComponent } from "../../../shared/components/data-filter/data-filter.component";
import { ItemIconComponent } from "../../../shared/components/item-icon/item-icon.component";
import { OpeningHoursComponent } from "../opening-hours/opening-hours.component";
import { CardComponent } from "../../../shared/components/card/card.component";
import { ShopItemDataDetailsComponent } from "../shop-item-data-details/shop-item-data-details.component";
import { ListDetailContainerComponent } from "../../../shared/components/list-detail-container/list-detail-container.component";

@Component({
    selector: 'app-sales-cart-stall',
    imports: [
        AsyncPipe,
        UiIconComponent,
        ShopItemDataTableComponent,
        DataFilterComponent,
        ItemIconComponent,
        OpeningHoursComponent,
        CardComponent,
        ShopItemDataDetailsComponent,
        ListDetailContainerComponent
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
