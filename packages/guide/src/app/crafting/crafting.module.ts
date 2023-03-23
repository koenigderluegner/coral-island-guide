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
import { CookingTableComponent } from './components/tables/cooking-table/cooking-table.component';
import { ProcessorTableComponent } from './components/tables/processor-table/processor-table.component';
import { InventoryTableComponent } from './components/tables/inventory-table/inventory-table.component';
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";

@NgModule({
    declarations: [
        CraftingComponent,
        InventoryComponent,
        InventoryDetailsComponent,
        ProcessorComponent,
        CookingComponent,
        CookingTableComponent,
        ProcessorTableComponent,
        InventoryTableComponent,
    ],
    imports: [CommonModule, CraftingRoutingModule, SharedModule, MatTabsModule, MatTableModule, MatSortModule],
    exports: [
        InventoryTableComponent,
        CookingTableComponent
    ]
})
export class CraftingModule {
}
