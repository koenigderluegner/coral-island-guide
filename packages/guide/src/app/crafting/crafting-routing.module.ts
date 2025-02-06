import { Routes } from '@angular/router';





export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'inventory',
    },
    {
        path: '',
        loadComponent: () => import('./crafting.component').then(m => m.CraftingComponent),
        children: [
            {path: 'inventory', loadComponent: () => import('./components/inventory/inventory.component').then(m => m.InventoryComponent), title: 'Inventory - Crafting'},
            {path: 'artisan', redirectTo: 'artisan/', pathMatch: 'full'},
            {path: 'artisan/:tabName', loadComponent: () => import('./components/processor/processor.component').then(m => m.ProcessorComponent), title: 'Artisan - Crafting'},
            {path: 'cooking', redirectTo: 'cooking/', pathMatch: 'full'},
            {path: 'cooking/:tabName', loadComponent: () => import('./components/cooking/cooking.component').then(m => m.CookingComponent), title: 'Cooking - Crafting'},
            {
                path: 'mixing',
                loadComponent: () => import('./mixing/mixing.component').then(c => c.MixingComponent),
                title: 'Mixing - Crafting'
            },
        ]
    },

];
