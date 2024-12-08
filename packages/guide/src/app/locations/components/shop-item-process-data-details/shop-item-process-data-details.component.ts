import { Component, input } from '@angular/core';
import { ItemProcessShopData } from "@ci/data-types";
import { MoneyComponent } from "../../../shared/components/money/money.component";
import { ChancePerItemListComponent } from "../../../shared/components/chance-per-item-list/chance-per-item-list.component";
import { BaseItemCardComponent } from "../../../shared/components/base-item-card/base-item-card.component";

@Component({
    selector: 'app-shop-item-process-data-details',
    templateUrl: './shop-item-process-data-details.component.html',

    imports: [
        MoneyComponent,
        ChancePerItemListComponent,
        BaseItemCardComponent
    ]
})
export class ShopItemProcessDataDetailsComponent {
    readonly itemProcessData = input.required<ItemProcessShopData>()

}
