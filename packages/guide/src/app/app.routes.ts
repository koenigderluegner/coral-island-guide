import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
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
        path: 'cooking',
        loadChildren: () =>
            import('./cooking/cooking.module').then((m) => m.CookingModule),
    },
    {
        path: 'shops',
        loadChildren: () =>
            import('./shops/shops.module').then((m) => m.ShopsModule),
    },
];