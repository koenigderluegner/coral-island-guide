import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CraftingComponent } from './crafting.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ProcessorComponent } from './components/processor/processor.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'inventory'
    },
    {
        path: '',
        component: CraftingComponent,
        children: [
            {path: 'inventory', component: InventoryComponent},
            {path: 'artisan', redirectTo: 'artisan/', pathMatch: 'full'},
            {path: 'artisan/:processor', component: ProcessorComponent},
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CraftingRoutingModule {
}
