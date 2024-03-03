import { Component, Input } from '@angular/core';
import { ItemUpgradeData } from "@ci/data-types";

@Component({
    selector: 'app-item-upgrade-details',
    templateUrl: './item-upgrade-details.component.html',
})
export class ItemUpgradeDetailsComponent {

    @Input({required: true}) itemUpgradeData!: ItemUpgradeData;

}
