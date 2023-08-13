import { Component } from '@angular/core';
import { ItemProcessShopData, ItemUpgradeData, OpeningHours, ShopItemData } from "@ci/data-types";
import { Observable } from "rxjs";
import { BaseSelectableContainerComponent } from "../../../shared/components/base-selectable-container/base-selectable-container.component";
import { UiIcon } from "../../../shared/enums/ui-icon.enum";

@Component({
    selector: 'app-blacksmith',
    templateUrl: './blacksmith.component.html',
})
export class BlacksmithComponent extends BaseSelectableContainerComponent<ShopItemData> {

    protected shopItemData$: Observable<ShopItemData[]>;
    protected uiIcon = UiIcon;
    protected openingHours$: Observable<Record<string, OpeningHours>>;
    protected itemProcessing$: Observable<ItemProcessShopData[]>;
    protected selectedProcessEntity: ItemProcessShopData | undefined;
    protected selectedItemUpgrade: ItemUpgradeData | undefined;
    protected showProcessingTable = false;
    protected showPItemUpgradeTable = false;
    protected itemUpgrade$: Observable<ItemUpgradeData[]>;


    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemData$("blacksmith");
        this.openingHours$ = this._database.fetchOpeningHours$("blacksmith");
        this.itemProcessing$ = this._database.fetchShopProcessItems$("blacksmith");
        this.itemUpgrade$ = this._database.fetchItemUpgradeData$("blacksmith");
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
