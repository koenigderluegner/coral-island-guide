import { Component, input } from '@angular/core';
import { MeritExchangeShopData } from "@ci/data-types";

@Component({
    selector: 'app-merit-shop-details',
    templateUrl: './merit-shop-details.component.html',
    standalone: false
})
export class MeritShopDetailsComponent {

    meritExchangeData = input.required<MeritExchangeShopData>();

}
