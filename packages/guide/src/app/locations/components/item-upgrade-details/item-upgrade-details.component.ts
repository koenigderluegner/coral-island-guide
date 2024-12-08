import { Component, input } from '@angular/core';
import { ItemUpgradeData } from "@ci/data-types";
import { ItemListComponent } from "../../../shared/components/item-list/item-list.component";
import { MoneyComponent } from "../../../shared/components/money/money.component";
import { BaseItemCardComponent } from "../../../shared/components/base-item-card/base-item-card.component";
import { TownrankPipe } from "../../../shared/pipes/townrank.pipe";

@Component({
    selector: 'app-item-upgrade-details',
    templateUrl: './item-upgrade-details.component.html',

    imports: [
        ItemListComponent,
        MoneyComponent,
        BaseItemCardComponent,
        TownrankPipe
    ]
})
export class ItemUpgradeDetailsComponent {

    itemUpgradeData = input.required<ItemUpgradeData>()

}
