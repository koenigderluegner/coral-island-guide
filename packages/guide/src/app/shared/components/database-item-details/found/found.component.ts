import { Component, input } from '@angular/core';
import { DatabaseItem } from "@ci/data-types";
import { ShopProcessingResultComponent } from "../shop-processing-result/shop-processing-result.component";

@Component({
    selector: 'app-db-item-found',
    imports: [
        ShopProcessingResultComponent
    ],
    templateUrl: './found.component.html'
})
export class FoundComponent {
    details = input.required<DatabaseItem>()
}
