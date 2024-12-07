import { Component, Input, input } from '@angular/core';
import { FestivalShopItemData } from "@ci/data-types";

@Component({
    selector: 'app-festival-shop-item-details',
    templateUrl: './festival-shop-item-details.component.html',
    standalone: false
})
export class FestivalShopItemDetailsComponent {

festivalShopItemData = input.required<FestivalShopItemData>();


}
