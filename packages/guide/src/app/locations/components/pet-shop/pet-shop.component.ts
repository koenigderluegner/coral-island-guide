import { Component } from '@angular/core';
import { PetShopAdoptions, ShopItemData, UiIcon } from "@ci/data-types";
import { combineLatest, map, Observable } from "rxjs";
import { BaseSelectableContainerComponent } from "../../../shared/components/base-selectable-container/base-selectable-container.component";


@Component({
    selector: 'app-pet-shop',
    templateUrl: './pet-shop.component.html',
    standalone: false
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
