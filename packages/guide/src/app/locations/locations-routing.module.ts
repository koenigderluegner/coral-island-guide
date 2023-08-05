import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsComponent } from './locations.component';
import { LakeTempleComponent } from "./components/lake-temple/lake-temple.component";
import { BlacksmithComponent } from "./components/blacksmith/blacksmith.component";

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
            {path: 'blacksmith', component: BlacksmithComponent, title: 'Blacksmith - Locations'},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LocationsRoutingModule {
}
