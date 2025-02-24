import { Routes } from '@angular/router';






export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./my-coral-guide.component').then(m => m.MyCoralGuideComponent),
        children: [
            {
                path: '', loadComponent: () => import('./components/index/index.component').then(m => m.IndexComponent)
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
                loadComponent: () => import('./components/museum-checklist/museum-checklist.component').then(m => m.MuseumChecklistComponent),
                title: 'Museum checklist - My Guide'
            },
            {
                path: 'cooking-recipes-checklist',
                redirectTo: 'cooking-recipes-checklist/',
                pathMatch: 'full'
            },
            {
                path: 'cooking-recipes-checklist/:tabName',
                loadComponent: () => import('./components/cooking-recipes-checklist/cooking-recipes-checklist.component').then(m => m.CookingRecipesChecklistComponent),
                title: 'Cooking recipes checklist - My Guide'
            },
            {
                path: 'offerings-checklist',
                redirectTo: 'offerings-checklist/',
                pathMatch: 'full'
            },
            {
                path: 'offerings-checklist/:tabName',
                loadComponent: () => import('./components/offerings-checklist/offerings-checklist.component').then(m => m.OfferingsChecklistComponent),
                title: 'Offerings checklist - My Guide'
            },
            {
                path: 'orchestra-zones-checklist',
                redirectTo: 'orchestra-zones-checklist/',
                pathMatch: 'full'
            },
            {
                path: 'orchestra-zones-checklist/:tabName',
                loadComponent: () => import('./components/orchestra-zones-checklist/orchestra-zones-checklist').then(m => m.OrchestraZonesChecklistComponent),
                title: 'Orchestra zones checklist - My Guide'
            },
            {
                path: 'settings',
                loadChildren: () => import('../settings/settings-routing.module').then((m) => m.routes),
                title: 'Settings - My Guide'
            },

        ]
    }

];
