import { Component } from '@angular/core';
import { BaseSelectableContainerComponent } from "../../../shared/components/base-selectable-container/base-selectable-container.component";
import { OpeningHours, ShopDisplayNames, ShopIcons, ShopItemData, ShopName, UiIcon } from "@ci/data-types";
import { Observable } from "rxjs";
import { HttpResourceRef } from "@angular/common/http";

@Component({
    selector: 'app-base-furniture-store',
    imports: [],
    template: ''
})
export abstract class BaseFurnitureStoreComponent extends BaseSelectableContainerComponent<ShopItemData> {

    protected abstract shopName: ShopName;
    protected readonly SHOP_DISPLAY_NAMES = ShopDisplayNames
    protected readonly SHOP_ICONS = ShopIcons

    protected shopItemDataIndoor$?: Observable<ShopItemData[]>;
    protected shopItemDataOutdoor$?: Observable<ShopItemData[]>;
    protected uiIcon = UiIcon;
    protected openingHours$?: HttpResourceRef<Record<string, OpeningHours> | undefined>;


}
