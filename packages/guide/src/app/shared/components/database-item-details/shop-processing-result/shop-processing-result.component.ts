import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { DatabaseItem } from "@ci/data-types";
import { ItemIconComponent } from "../../item-icon/item-icon.component";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
    selector: 'app-shop-processing-result',
    imports: [ItemIconComponent, TranslatePipe],
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './shop-processing-result.component.html'
})
export class ShopProcessingResultComponent {

    readonly itemProcessData = input.required<DatabaseItem["chanceAsProcessResult"]>();


}
