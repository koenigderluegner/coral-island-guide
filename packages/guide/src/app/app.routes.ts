import { Route } from "@angular/router";
import { StartComponent } from "./start/start.component";

export const appRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        component: StartComponent,
    },
    {
        path: 'journal',
        loadChildren: () => import('./journal/journal-routing.module').then((m) => m.routes),
    },
    {
        path: 'database',
        pathMatch: 'full',
        redirectTo: 'database/',
    },
    {
        path: 'database/:itemId',
        loadChildren: () => import('./database/database-routing.module').then((m) => m.routes),
    },
    {
        path: 'crafting',
        loadChildren: () => import('./crafting/crafting-routing.module').then((m) => m.routes),
    },
    {
        path: 'people',
        pathMatch: 'prefix',
        redirectTo: 'npcs',
    },
    {
        path: 'npcs',
        loadChildren: () => import('./npcs/npcs-routing.module').then((m) => m.routes),
    },
    {
        path: 'locations',
        loadChildren: () => import('./locations/locations-routing.module').then((m) => m.routes),
    },
    {
        path: 'settings',
        pathMatch: "full",
        redirectTo: 'my/settings',
        data: {
            redirected: true
        }
    },
    {
        path: 'checklist',
        pathMatch: "prefix",
        redirectTo: 'my/to-do',
        data: {
            redirected: true
        }
    },
    {
        path: 'only-in-live',
        loadComponent: () => import('./only-in-live/only-in-live.component').then(c => c.OnlyInBLiveComponent)
    },
    {
        path: 'only-in-beta',
        loadComponent: () => import('./only-in-beta/only-in-beta.component').then(c => c.OnlyInBetaComponent)
    },
    {
        path: 'my',
        loadChildren: () => import('./my-coral-guide/my-coral-guide-routing.module').then(m => m.routes)
    },
    {
        path: 'about',
        loadComponent: () => import('./about/about.component').then(c => c.AboutComponent)
    },
    {
        path: '**',
        loadComponent: () => import('./error-404/error-404.component').then(c => c.Error404Component)
    }
];
