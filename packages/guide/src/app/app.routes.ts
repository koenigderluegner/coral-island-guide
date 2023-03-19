import { Route } from '@angular/router';
import { StartComponent } from './start/start.component';

export const appRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        component: StartComponent
    }, {
        path: 'journal',
        loadChildren: () =>
            import('./journal/journal.module').then((m) => m.JournalModule),
    },
    {
        path: 'database',
        loadChildren: () =>
            import('./database/database.module').then((m) => m.DatabaseModule),
    },
    {
        path: 'crafting',
        loadChildren: () =>
            import('./crafting/crafting.module').then((m) => m.CraftingModule),
    },
    {
        path: 'shops',
        loadChildren: () =>
            import('./shops/shops.module').then((m) => m.ShopsModule),
    },
    {
        path: 'people',
        loadChildren: () =>
            import('./people/people.module').then((m) => m.PeopleModule),
    },
];
