import { Component, Input } from '@angular/core';
import { ShopItemData } from "@ci/data-types";

@Component({
    selector: 'app-shop-item-data-details',
    templateUrl: './shop-item-data-details.component.html',
    styleUrls: ['./shop-item-data-details.component.scss'],
})
export class ShopItemDataDetailsComponent {

    @Input({required: true}) shopItemData!: ShopItemData;

}
