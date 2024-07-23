import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CraftingComponent } from './crafting.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ProcessorComponent } from './components/processor/processor.component';
import { CookingComponent } from "./components/cooking/cooking.component";
import { onlyInBetaGuard } from "../core/guards/only-in-beta.guard";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'inventory',
    },
    {
        path: '',
        component: CraftingComponent,
        children: [
            {path: 'inventory', component: InventoryComponent, title: 'Inventory - Crafting'},
            {path: 'artisan', redirectTo: 'artisan/', pathMatch: 'full'},
            {path: 'artisan/:tabName', component: ProcessorComponent, title: 'Artisan - Crafting'},
            {path: 'cooking', redirectTo: 'cooking/', pathMatch: 'full'},
            {path: 'cooking/:tabName', component: CookingComponent, title: 'Cooking - Crafting'},
            {
                path: 'mixing',
                loadComponent: () => import('./mixing/mixing.component').then(c => c.MixingComponent),
                title: 'Mixing - Crafting'
            },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CraftingRoutingModule {
}
