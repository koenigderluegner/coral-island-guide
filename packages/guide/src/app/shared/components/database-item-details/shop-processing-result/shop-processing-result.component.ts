import { Component, input } from '@angular/core';
import { DatabaseItem } from "@ci/data-types";
import { ItemIconComponent } from "../../item-icon/item-icon.component";

@Component({
    selector: 'app-shop-processing-result',
    imports: [ItemIconComponent],
    templateUrl: './shop-processing-result.component.html'
})
export class ShopProcessingResultComponent {

    readonly itemProcessData = input.required<DatabaseItem["chanceAsProcessResult"]>();


}
