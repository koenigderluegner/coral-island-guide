import { Component } from '@angular/core';
import { ItemProcessShopData, OpeningHours, ShopItemData } from "@ci/data-types";
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
    protected showProcessingTable = false


    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemDataBlacksmith$();
        this.openingHours$ = this._database.fetchOpeningHoursBlacksmith$();
        this.itemProcessing$ = this._database.fetchShopProcessItemsBlacksmith$();
    }

    override showDetails(selectedEntry?: ShopItemData) {
        this.selectedProcessEntity = undefined;
        super.showDetails(selectedEntry);
    }

    showProcessDetails(selectedEntry?: ItemProcessShopData) {
        this.selectedEntity = undefined;
        this.selectedProcessEntity = selectedEntry;
        this.openDrawer = true;
    }

}
