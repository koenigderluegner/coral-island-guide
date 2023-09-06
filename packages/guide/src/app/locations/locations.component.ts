import { Component } from '@angular/core';
import { UiIcon } from "../shared/enums/ui-icon.enum";
import { SettingsService } from "../shared/services/settings.service";
import { ShopDisplayNames, ShopIcons, ShopName } from "@ci/data-types";
import { shopRouteConfig } from "./locations-shop-route-config";

@Component({
    selector: 'app-locations',
    templateUrl: './locations.component.html',
})
export class LocationsComponent {
    protected uiIcon = UiIcon;
    protected readonly SHOP_DISPLAY_NAMES = ShopDisplayNames;
    protected readonly SHOP_ICONS = ShopIcons;

    protected shops: ShopName[] = shopRouteConfig.map(c => c.name)

    constructor(protected settings: SettingsService) {
    }
}
