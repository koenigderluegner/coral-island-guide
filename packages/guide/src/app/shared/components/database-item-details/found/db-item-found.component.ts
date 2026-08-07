import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { DatabaseItem } from "@ci/data-types";
import { ShopProcessingResultComponent } from "../shop-processing-result/shop-processing-result.component";

@Component({
    selector: 'app-db-item-found',
    imports: [
        ShopProcessingResultComponent
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './db-item-found.component.html'
})
export class DbItemFoundComponent {
    details = input.required<DatabaseItem>()
}
