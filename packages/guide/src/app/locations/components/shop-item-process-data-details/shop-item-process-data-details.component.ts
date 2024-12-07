import { Component, input } from '@angular/core';
import { ItemProcessShopData } from "@ci/data-types";

@Component({
    selector: 'app-shop-item-process-data-details',
    templateUrl: './shop-item-process-data-details.component.html',
    standalone: false
})
export class ShopItemProcessDataDetailsComponent {
    readonly itemProcessData = input.required<ItemProcessShopData>()

}
