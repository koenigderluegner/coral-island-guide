import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LocationsComponent } from './locations.component';
import { SharedModule } from '../shared/shared.module';
import { LakeTempleComponent } from './components/lake-temple/lake-temple.component';
import { LocationsRoutingModule } from './locations-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { OfferingsTableComponent } from './components/tables/offerings-table/offerings-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { BlacksmithComponent } from './components/blacksmith/blacksmith.component';
import { CraftingModule } from '../crafting/crafting.module';
import { ShopItemDataDetailsComponent } from './components/shop-item-data-details/shop-item-data-details.component';
import { ShopItemDataTableComponent } from './components/tables/shop-item-data-table/shop-item-data-table.component';

@NgModule({
    declarations: [
        LocationsComponent,
        LakeTempleComponent,
        OfferingsTableComponent,
        BlacksmithComponent,
        ShopItemDataDetailsComponent,
        ShopItemDataTableComponent,
    ],
    imports: [
        CommonModule,
        LocationsRoutingModule,
        SharedModule,
        MatTabsModule,
        NgOptimizedImage,
        MatTableModule,
        MatSortModule,
        CraftingModule,
    ],
    exports: [OfferingsTableComponent],
})
export class LocationsModule {
}
