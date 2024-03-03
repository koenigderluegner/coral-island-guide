import { Component, Input } from '@angular/core';
import { FestivalShopItemData } from "@ci/data-types";

@Component({
    selector: 'app-festival-shop-item-details',
    templateUrl: './festival-shop-item-details.component.html',
})
export class FestivalShopItemDetailsComponent {

    @Input({required: true}) festivalShopItemData!: FestivalShopItemData;


}
