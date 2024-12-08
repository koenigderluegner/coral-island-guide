import { Component } from '@angular/core';
import { BaseSelectableContainerComponent } from "../../../shared/components/base-selectable-container/base-selectable-container.component";
import { MeritExchangeShopData, UiIcon } from "@ci/data-types";
import { Observable } from "rxjs";
import { UiIconComponent } from "../../../shared/components/ui-icon/ui-icon.component";
import { CardComponent } from "../../../shared/components/card/card.component";
import { MeritShopDetailsComponent } from "../merit-shop-details/merit-shop-details.component";
import { ListDetailContainerComponent } from "../../../shared/components/list-detail-container/list-detail-container.component";
import { ItemIconComponent } from "../../../shared/components/item-icon/item-icon.component";
import { AsyncPipe } from "@angular/common";

@Component({
    selector: 'app-merit-shop',
    templateUrl: './merit-shop.component.html',

    imports: [
        UiIconComponent,
        CardComponent,
        MeritShopDetailsComponent,
        ListDetailContainerComponent,
        ItemIconComponent,
        AsyncPipe
    ]
})
export class MeritShopComponent extends BaseSelectableContainerComponent<MeritExchangeShopData> {

    protected shopItemData$: Observable<MeritExchangeShopData[]>;
    protected uiIcon = UiIcon;


    constructor() {
        super();
        this.shopItemData$ = this._database.fetchMeritExchangeShopData$();
    }
}
