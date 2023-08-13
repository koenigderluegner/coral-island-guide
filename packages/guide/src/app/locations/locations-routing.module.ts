import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsComponent } from './locations.component';
import { LakeTempleComponent } from "./components/lake-temple/lake-temple.component";
import { BlacksmithComponent } from "./components/blacksmith/blacksmith.component";
import { onlyInBetaGuard } from "../core/guards/only-in-beta.guard";
import { LabComponent } from "./components/lab/lab.component";

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
            {
                path: 'blacksmith',
                component: BlacksmithComponent,
                title: 'Blacksmith - Locations',
                canActivate: [onlyInBetaGuard]
            },
            {
                path: 'lab',
                component: LabComponent,
                title: 'Lab - Locations',
                canActivate: [onlyInBetaGuard]
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LocationsRoutingModule {
}
