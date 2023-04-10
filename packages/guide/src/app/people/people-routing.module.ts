import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleComponent } from './people.component';
import { GiftingComponent } from './components/gifting/gifting.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'gifting'
    },
    {

        path: '',
        component: PeopleComponent,
        children: [
            {path: 'gifting', component: GiftingComponent, title: 'Gifting - People'},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PeopleRoutingModule {
}
