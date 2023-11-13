import { Component } from '@angular/core';
import { UiIcon } from "../shared/enums/ui-icon.enum";
import {
    FestivalDisplayNames,
    FestivalIcons,
    FestivalName,
    ShopDisplayNames,
    ShopIcons,
    ShopName
} from "@ci/data-types";
import { shopRouteConfig } from "./locations-shop-route-config";
import { festivalRouteConfig } from "./locations-festival-route-config";

@Component({
    selector: 'app-locations',
    templateUrl: './locations.component.html',
})
export class LocationsComponent {
    protected uiIcon = UiIcon;
    protected readonly SHOP_DISPLAY_NAMES = ShopDisplayNames;
    protected readonly SHOP_ICONS = ShopIcons;
    protected readonly FESTIVAL_DISPLAY_NAMES = FestivalDisplayNames;
    protected readonly FESTIVAL_ICONS = FestivalIcons;

    protected shops: ShopName[] = shopRouteConfig
        .map(c => c.name)
        .sort((a, b) => ShopDisplayNames[a].localeCompare(ShopDisplayNames[b]))

    protected festivals: FestivalName[] = festivalRouteConfig
        .map(c => c.data.name)
        .sort((a, b) => FestivalDisplayNames[a].localeCompare(FestivalDisplayNames[b]))
}
