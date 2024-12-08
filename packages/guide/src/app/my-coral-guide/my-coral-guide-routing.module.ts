import { Routes } from '@angular/router';
import { MyCoralGuideComponent } from './my-coral-guide.component';
import { IndexComponent } from "./components/index/index.component";
import { MuseumChecklistComponent } from "./components/museum-checklist/museum-checklist.component";
import { CookingRecipesChecklistComponent } from "./components/cooking-recipes-checklist/cooking-recipes-checklist.component";
import { OfferingsChecklistComponent } from "./components/offerings-checklist/offerings-checklist.component";

export const routes: Routes = [
    {
        path: '',
        component: MyCoralGuideComponent,
        children: [
            {
                path: '', component: IndexComponent
            },
            {
                path: 'to-do',
                loadChildren: () => import('../to-do/to-do.module').then(m => m.routes)
            },

            {
                path: 'museum-checklist',
                redirectTo: 'museum-checklist/',
                pathMatch: 'full'
            },
            {
                path: 'museum-checklist/:tabName',
                component: MuseumChecklistComponent,
                title: 'Museum checklist - My Guide'
            },
            {
                path: 'cooking-recipes-checklist',
                redirectTo: 'cooking-recipes-checklist/',
                pathMatch: 'full'
            },
            {
                path: 'cooking-recipes-checklist/:tabName',
                component: CookingRecipesChecklistComponent,
                title: 'Cooking recipes checklist - My Guide'
            },
            {
                path: 'offerings-checklist',
                redirectTo: 'offerings-checklist/',
                pathMatch: 'full'
            },
            {
                path: 'offerings-checklist/:tabName',
                component: OfferingsChecklistComponent,
                title: 'Offerings checklist - My Guide'
            },
            {
                path: 'settings',
                loadChildren: () => import('../settings/settings-routing.module').then((m) => m.routes),
                title: 'Settings - My Guide'
            },

        ]
    }

];
