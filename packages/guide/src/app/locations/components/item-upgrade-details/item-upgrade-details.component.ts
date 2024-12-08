import { Component, input } from '@angular/core';
import { ItemUpgradeData } from "@ci/data-types";

@Component({
    selector: 'app-item-upgrade-details',
    templateUrl: './item-upgrade-details.component.html',
    standalone: false
})
export class ItemUpgradeDetailsComponent {

    itemUpgradeData = input.required<ItemUpgradeData>()

}
