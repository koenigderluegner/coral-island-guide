import { Component } from '@angular/core';
import { ShopName } from "@ci/data-types";
import { BaseShopComponent } from "../../base-shop/base-shop.component";
import { UiIconComponent } from "../../../../shared/components/ui-icon/ui-icon.component";
import { ListDetailContainerComponent } from "../../../../shared/components/list-detail-container/list-detail-container.component";
import { ItemUpgradeDetailsComponent } from "../../item-upgrade-details/item-upgrade-details.component";
import { ItemUpgradeTableComponent } from "../../tables/item-upgrade-table/item-upgrade-table.component";
import { DataFilterComponent } from "../../../../shared/components/data-filter/data-filter.component";
import { ItemIconComponent } from "../../../../shared/components/item-icon/item-icon.component";
import { ShopItemProcessTableComponent } from "../../tables/shop-item-process-table/shop-item-process-table.component";
import { ShopItemDataTableComponent } from "../../tables/shop-item-data-table/shop-item-data-table.component";
import { OpeningHoursComponent } from "../../opening-hours/opening-hours.component";
import { CardComponent } from "../../../../shared/components/card/card.component";
import { ShopItemDataDetailsComponent } from "../../shop-item-data-details/shop-item-data-details.component";
import { ShopItemProcessDataDetailsComponent } from "../../shop-item-process-data-details/shop-item-process-data-details.component";
import { AsyncPipe } from "@angular/common";

@Component({
    selector: 'app-carpenter',
    templateUrl: '../../base-shop/base-shop.component.html',
    imports: [
        UiIconComponent,
        ListDetailContainerComponent,
        ItemUpgradeDetailsComponent,
        ItemUpgradeTableComponent,
        DataFilterComponent,
        ItemIconComponent,
        ShopItemProcessTableComponent,
        ShopItemDataTableComponent,
        OpeningHoursComponent,
        CardComponent,
        ShopItemDataDetailsComponent,
        ShopItemProcessDataDetailsComponent,
        AsyncPipe
    ]
})
export class CarpenterComponent extends BaseShopComponent {

    override upgradeHeaderText = 'Buildings';
    protected shopName: ShopName = "carpenter";

    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemData$(this.shopName);
        this.openingHours$ = this._database.fetchOpeningHours$(this.shopName);
        this.itemUpgrade$ = this._database.fetchItemUpgradeData$(this.shopName);
    }
}
