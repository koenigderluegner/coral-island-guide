import { Component } from '@angular/core';
import { BaseSelectableContainerComponent } from "../../../shared/components/base-selectable-container/base-selectable-container.component";
import {
    ItemProcessShopData,
    ItemUpgradeData,
    OpeningHours,
    ShopDisplayNames,
    ShopIcons,
    ShopItemData,
    ShopName,
    UiIcon
} from "@ci/data-types";
import { Observable } from "rxjs";
import { HttpResourceRef } from "@angular/common/http";

@Component({
    template: '',
})
export abstract class BaseShopComponent extends BaseSelectableContainerComponent<ShopItemData> {

    protected abstract shopName: ShopName;
    protected readonly SHOP_DISPLAY_NAMES = ShopDisplayNames
    protected readonly SHOP_ICONS = ShopIcons

    protected upgradeHeaderText = 'Upgrades';

    protected shopItemData$?: Observable<ShopItemData[]>;
    protected uiIcon = UiIcon;
    protected openingHours$?: HttpResourceRef<Record<string, OpeningHours> | undefined>;
    protected itemProcessing$?: Observable<ItemProcessShopData[]>;
    protected selectedProcessEntity: ItemProcessShopData | undefined;
    protected showProcessingTable = false
    protected showPItemUpgradeTable = false;
    protected itemUpgrade$?: Observable<ItemUpgradeData[]>;
    protected selectedItemUpgrade: ItemUpgradeData | undefined;

    override showDetails(selectedEntry?: ShopItemData) {
        this.selectedProcessEntity = undefined;
        this.selectedItemUpgrade = undefined;
        super.showDetails(selectedEntry);
    }

    showProcessDetails(selectedEntry?: ItemProcessShopData) {
        this.selectedEntity = undefined;
        this.selectedItemUpgrade = undefined;
        this.selectedProcessEntity = selectedEntry;
        this.listDetail.open()
    }

    showItemUpgradeDetails(selectedEntry?: ItemUpgradeData) {
        this.selectedEntity = undefined;
        this.selectedItemUpgrade = selectedEntry;
        this.selectedProcessEntity = undefined;
        this.listDetail.open()
    }
}
