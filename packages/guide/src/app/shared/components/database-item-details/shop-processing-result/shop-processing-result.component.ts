import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseItem } from "@ci/data-types";
import { SharedModule } from "../../../shared.module";

@Component({
    selector: 'app-shop-processing-result',
    imports: [CommonModule, SharedModule],
    templateUrl: './shop-processing-result.component.html'
})
export class ShopProcessingResultComponent {

    @Input({required: true}) itemProcessData!: DatabaseItem["chanceAsProcessResult"]


}
