import { CanActivateFn, Route, Routes } from '@angular/router';
import { onlyInBetaGuard } from "../core/guards/only-in-beta.guard";
import { FestivalDisplayNames, ShopDisplayNames } from "@ci/data-types";
import { shopRouteConfig } from "./locations-shop-route-config";
import { festivalRouteConfig } from "./locations-festival-route-config";
import { onlyInLiveGuard } from "../core/guards/only-in-live.guard";


export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'lake-temple'
    },
    {
        path: '',
        loadComponent: () => import('./locations.component').then(m => m.LocationsComponent),
        children: [
            {path: 'lake-temple', redirectTo: 'lake-temple/', pathMatch: 'full'},
            {
                path: 'lake-temple/:tabName',
                loadComponent: () => import('./components/lake-temple/lake-temple.component').then(c => c.LakeTempleComponent),
                title: 'Lake temple - Locations'
            },

            ...shopRouteConfig.map(config => {

                    const component: Pick<Route, 'component'> | Pick<Route, 'loadComponent'> = 'component' in config ?
                        {component: config.component} : {loadComponent: config.loadComponent}


                    const guards: CanActivateFn[] = [];

                    if (config.betaOnly) {
                        guards.push(onlyInBetaGuard)
                    }
                    if (config.liveOnly) {
                        guards.push(onlyInLiveGuard)
                    }

                    return ({
                        path: config.name,
                        ...component,
                        title: `${ShopDisplayNames[config.name]} - Locations`,
                        canActivate: guards
                    })
                }
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
                loadComponent: () => import('./components/merit-shop/merit-shop.component').then(m => m.MeritShopComponent),
                title: `Merit Exchange - Locations`
            },
            {
                path: 'orchestra-zones',
                loadComponent: () => import('./components/orchestra-zones/orchestra-zones.component').then(c => c.OrchestraZonesComponent),
                title: `Orchestra Zones - Locations`,
                canActivate: [onlyInLiveGuard]
            }

        ]
    }
];
