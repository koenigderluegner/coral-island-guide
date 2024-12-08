import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseItem } from "@ci/data-types";
import { ItemIconComponent } from "../../item-icon/item-icon.component";

@Component({
    selector: 'app-shop-processing-result',
    imports: [CommonModule, ItemIconComponent],
    templateUrl: './shop-processing-result.component.html'
})
export class ShopProcessingResultComponent {

    readonly itemProcessData = input.required<DatabaseItem["chanceAsProcessResult"]>();


}
