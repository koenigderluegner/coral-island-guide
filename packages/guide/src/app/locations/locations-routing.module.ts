import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsComponent } from './locations.component';
import { LakeTempleComponent } from "./components/lake-temple/lake-temple.component";
import { onlyInBetaGuard } from "../core/guards/only-in-beta.guard";
import { ShopDisplayNames } from "@ci/data-types";
import { shopRouteConfig } from "./locations-shop-route-config";


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
            })),

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LocationsRoutingModule {
}
