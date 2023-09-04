import { Component } from '@angular/core';
import { BaseSelectableContainerComponent } from "../../../shared/components/base-selectable-container/base-selectable-container.component";
import { ItemProcessShopData, ItemUpgradeData, OpeningHours, ShopItemData } from "@ci/data-types";
import { Observable } from "rxjs";
import { UiIcon } from "../../../shared/enums/ui-icon.enum";

@Component({
    selector: 'app-lab',
    templateUrl: './lab.component.html',
})
export class LabComponent extends BaseSelectableContainerComponent<ShopItemData> {

    protected shopItemData$: Observable<ShopItemData[]>;
    protected uiIcon = UiIcon;
    protected openingHours$: Observable<Record<string, OpeningHours>>;
    protected itemProcessing$: Observable<ItemProcessShopData[]>;
    protected selectedProcessEntity: ItemProcessShopData | undefined;
    protected showProcessingTable = false
    protected showPItemUpgradeTable = false;
    protected itemUpgrade$: Observable<ItemUpgradeData[]>;
    protected selectedItemUpgrade: ItemUpgradeData | undefined;


    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemData$("lab");
        this.openingHours$ = this._database.fetchOpeningHours$("lab");
        this.itemProcessing$ = this._database.fetchShopProcessItems$("lab");
        this.itemUpgrade$ = this._database.fetchItemUpgradeData$("lab");
    }

    override showDetails(selectedEntry?: ShopItemData) {
        this.selectedProcessEntity = undefined;
        this.selectedItemUpgrade = undefined;
        super.showDetails(selectedEntry);
    }

    showProcessDetails(selectedEntry?: ItemProcessShopData) {
        this.selectedEntity = undefined;
        this.selectedItemUpgrade = undefined;
        this.selectedProcessEntity = selectedEntry;
        this.openDrawer = true;
    }

    showItemUpgradeDetails(selectedEntry?: ItemUpgradeData) {
        this.selectedEntity = undefined;
        this.selectedItemUpgrade = selectedEntry;
        this.selectedProcessEntity = undefined;
        this.openDrawer = true;
    }
}
