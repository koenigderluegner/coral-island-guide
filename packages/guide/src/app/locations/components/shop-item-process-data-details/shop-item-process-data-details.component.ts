import { Component, Input } from '@angular/core';
import { ItemProcessShopData } from "@ci/data-types";

@Component({
    selector: 'app-shop-item-process-data-details',
    templateUrl: './shop-item-process-data-details.component.html',
})
export class ShopItemProcessDataDetailsComponent {

    @Input({required: true}) itemProcessData!: ItemProcessShopData

}
