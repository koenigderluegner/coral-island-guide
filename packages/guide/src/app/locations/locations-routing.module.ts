import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsComponent } from './locations.component';
import { LakeTempleComponent } from "./components/lake-temple/lake-temple.component";
import { onlyInBetaGuard } from "../core/guards/only-in-beta.guard";
import { FestivalDisplayNames, ShopDisplayNames } from "@ci/data-types";
import { shopRouteConfig } from "./locations-shop-route-config";
import { MeritShopComponent } from "./components/merit-shop/merit-shop.component";
import { festivalRouteConfig } from "./locations-festival-route-config";


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'lake-temple'
    },
    {
        path: '',
        component: LocationsComponent,
        children: [
            {path: 'lake-temple', redirectTo: 'lake-temple/', pathMatch: 'full'},
            {path: 'lake-temple/:tabName', component: LakeTempleComponent, title: 'Lake temple - Locations'},

            ...shopRouteConfig.map(config => ({
                path: config.name,
                component: config.component,
                title: `${ShopDisplayNames[config.name]} - Locations`,
                canActivate: config.betaOnly ? [onlyInBetaGuard] : []
                })
            ),
            ...festivalRouteConfig.map(config => ({
                    path: config.data.name,
                    component: config.component,
                    title: `${FestivalDisplayNames[config.data.name]} - Locations`,
                    canActivate: config.betaOnly ? [onlyInBetaGuard] : [],
                    data: config.data
                })
            ),
            {
                path: 'merit-exchange',
                component: MeritShopComponent,
                title: `Merit Exchange - Locations`
            }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LocationsRoutingModule {
}
