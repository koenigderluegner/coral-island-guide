import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { ItemUpgradeData, OpeningHours, ShopItemData } from "@ci/data-types";
import { UiIcon } from "../../../shared/enums/ui-icon.enum";
import { BaseSelectableContainerComponent } from "../../../shared/components/base-selectable-container/base-selectable-container.component";

@Component({
    selector: 'app-carpenter',
    templateUrl: './carpenter.component.html',
})
export class CarpenterComponent extends BaseSelectableContainerComponent<ShopItemData> {
    protected shopItemData$: Observable<ShopItemData[]>;
    protected uiIcon = UiIcon;
    protected openingHours$: Observable<Record<string, OpeningHours>>;
    protected buildingUpgrades$: Observable<ItemUpgradeData[]>;
    protected selectedItemUpgrade: ItemUpgradeData | undefined;
    protected showPItemUpgradeTable = false;


    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemData$("carpenter");
        this.openingHours$ = this._database.fetchOpeningHours$("carpenter");
        this.buildingUpgrades$ = this._database.fetchItemUpgradeData$("carpenter");
    }

    override showDetails(selectedEntry?: ShopItemData) {
        this.selectedItemUpgrade = undefined;
        super.showDetails(selectedEntry);
    }


    showItemUpgradeDetails(selectedEntry?: ItemUpgradeData) {
        this.selectedEntity = undefined;
        this.selectedItemUpgrade = selectedEntry;
        this.openDrawer = true;
    }


}
