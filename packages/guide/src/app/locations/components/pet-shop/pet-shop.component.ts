import { Component } from '@angular/core';
import { PetShopAdoptions, ShopItemData, UiIcon } from "@ci/data-types";
import { combineLatest, map, Observable } from "rxjs";
import { BaseSelectableContainerComponent } from "../../../shared/components/base-selectable-container/base-selectable-container.component";
import { CardComponent } from "../../../shared/components/card/card.component";
import { PetAdoptionDetailsComponent } from "../pet-adoption-details/pet-adoption-details.component";
import { ShopItemDataDetailsComponent } from "../shop-item-data-details/shop-item-data-details.component";
import { ListDetailContainerComponent } from "../../../shared/components/list-detail-container/list-detail-container.component";
import { UiIconComponent } from "../../../shared/components/ui-icon/ui-icon.component";
import { AsyncPipe } from "@angular/common";
import { DataFilterComponent } from "../../../shared/components/data-filter/data-filter.component";
import { ItemIconComponent } from "../../../shared/components/item-icon/item-icon.component";
import { ShopItemDataTableComponent } from "../tables/shop-item-data-table/shop-item-data-table.component";


@Component({
    selector: 'app-pet-shop',
    templateUrl: './pet-shop.component.html',

    imports: [
        CardComponent,
        PetAdoptionDetailsComponent,
        ShopItemDataDetailsComponent,
        ListDetailContainerComponent,
        UiIconComponent,
        AsyncPipe,
        DataFilterComponent,
        ItemIconComponent,
        ShopItemDataTableComponent
    ]
})
export class PetShopComponent extends BaseSelectableContainerComponent<ShopItemData> {

    protected shopItemData$: Observable<ShopItemData[]>;
    protected uiIcon = UiIcon;
    protected petShopAdoptions$: Observable<PetShopAdoptions[]>;
    protected selectedAdoption?: PetShopAdoptions


    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemData$("pet-shop");
        this.petShopAdoptions$ = combineLatest([
            this._database.fetchPetShopAdoptions$(),
            this._database.fetchNPCs$()
        ]).pipe(
            map(data => data[0])
        );
    }

    override showDetails(selectedEntry?: ShopItemData) {
        super.showDetails(selectedEntry);
        this.selectedAdoption = undefined;
    }

    showAdoptionDetails(selectedAdoption?: PetShopAdoptions): void {
        this.selectedEntity = undefined;
        this.selectedAdoption = selectedAdoption;
        this.listDetail.open()

    }
}
