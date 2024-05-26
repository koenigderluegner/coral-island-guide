import { Component } from '@angular/core';
import { BaseSelectableContainerComponent } from "../../../shared/components/base-selectable-container/base-selectable-container.component";
import { OpeningHours, ShopDisplayNames, ShopIcons, ShopItemData, ShopName, UiIcon } from "@ci/data-types";
import { Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { LocationsModule } from "../../locations.module";
import { SharedModule } from "../../../shared/shared.module";

@Component({
    selector: 'app-base-furniture-store',
    standalone: true,
    imports: [
        AsyncPipe,
        LocationsModule,
        SharedModule
    ],
    template: ''
})
export abstract class BaseFurnitureStoreComponent extends BaseSelectableContainerComponent<ShopItemData> {

    protected abstract shopName: ShopName;
    protected readonly SHOP_DISPLAY_NAMES = ShopDisplayNames
    protected readonly SHOP_ICONS = ShopIcons

    protected shopItemDataIndoor$?: Observable<ShopItemData[]>;
    protected shopItemDataOutdoor$?: Observable<ShopItemData[]>;
    protected uiIcon = UiIcon;
    protected openingHours$?: Observable<Record<string, OpeningHours>>;


}
