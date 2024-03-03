import { Component, Input } from '@angular/core';
import { MeritExchangeShopData } from "@ci/data-types";

@Component({
    selector: 'app-merit-shop-details',
    templateUrl: './merit-shop-details.component.html',
})
export class MeritShopDetailsComponent {

    @Input({required: true}) meritExchangeData!: MeritExchangeShopData;

}
