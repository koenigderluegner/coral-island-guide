import { Component, inject } from '@angular/core';
import {
    FestivalDisplayNames,
    FestivalIcons,
    FestivalName,
    ShopDisplayNames,
    ShopIcons,
    ShopName,
    UiIcon
} from "@ci/data-types";
import { shopRouteConfig } from "./locations-shop-route-config";
import { festivalRouteConfig } from "./locations-festival-route-config";
import { SettingsService } from "../shared/services/settings.service";

@Component({
    selector: 'app-locations',
    templateUrl: './locations.component.html',
    standalone: false
})
export class LocationsComponent {
    protected uiIcon = UiIcon;
    protected readonly SHOP_DISPLAY_NAMES = ShopDisplayNames;
    protected readonly SHOP_ICONS = ShopIcons;
    protected readonly FESTIVAL_DISPLAY_NAMES = FestivalDisplayNames;
    protected readonly FESTIVAL_ICONS = FestivalIcons;

    protected isBeta = inject(SettingsService).getSettings().useBeta

    protected shops: ShopName[] = shopRouteConfig
        .filter(c => this.isBeta ? true : !c.betaOnly)
        .map(c => c.name)
        .sort((a, b) => ShopDisplayNames[a].localeCompare(ShopDisplayNames[b]))

    protected festivals: FestivalName[] = festivalRouteConfig
        .map(c => c.data.name)
        .sort((a, b) => FestivalDisplayNames[a].localeCompare(FestivalDisplayNames[b]))
}
