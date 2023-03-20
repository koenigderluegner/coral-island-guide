import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CraftingComponent } from './crafting.component';
import { SharedModule } from '../shared/shared.module';
import { InventoryComponent } from './components/inventory/inventory.component';
import { CraftingRoutingModule } from './crafting-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { InventoryDetailsComponent } from './components/inventory-details/inventory-details.component';
import { ProcessorComponent } from './components/processor/processor.component';
import { CookingComponent } from './components/cooking/cooking.component';

@NgModule({
    declarations: [
        CraftingComponent,
        InventoryComponent,
        InventoryDetailsComponent,
        ProcessorComponent,
        CookingComponent,
    ],
    imports: [CommonModule, CraftingRoutingModule, SharedModule, MatTabsModule],
})
export class CraftingModule {
}
