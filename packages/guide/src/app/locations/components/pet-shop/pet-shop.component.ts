import { Component } from '@angular/core';
import { UiIcon } from "../../../shared/enums/ui-icon.enum";
import { Observable } from "rxjs";
import { ShopItemData } from "@ci/data-types";
import { BaseSelectableContainerComponent } from "../../../shared/components/base-selectable-container/base-selectable-container.component";

@Component({
    selector: 'app-pet-shop',
    templateUrl: './pet-shop.component.html',
})
export class PetShopComponent  extends BaseSelectableContainerComponent<ShopItemData>{

    protected shopItemData$: Observable<ShopItemData[]>;
    protected uiIcon = UiIcon;


    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemData$("pet-shop");
    }
}
