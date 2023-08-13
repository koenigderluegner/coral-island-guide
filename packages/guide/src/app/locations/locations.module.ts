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
import { ShopItemProcessTableComponent } from './components/tables/shop-item-process-table/shop-item-process-table.component';
import { LabComponent } from './components/lab/lab.component';
import { ShopItemProcessDataDetailsComponent } from './components/shop-item-process-data-details/shop-item-process-data-details.component';
import { OpeningHoursComponent } from './components/opening-hours/opening-hours.component';
import { GeneralStoreComponent } from './components/general-store/general-store.component';
import { CarpenterComponent } from './components/carpenter/carpenter.component';
import { ItemUpgradeDetailsComponent } from './components/item-upgrade-details/item-upgrade-details.component';
import { ItemUpgradeTableComponent } from './components/tables/item-upgrade-table/item-upgrade-table.component';

@NgModule({
    declarations: [
        LocationsComponent,
        LakeTempleComponent,
        OfferingsTableComponent,
        BlacksmithComponent,
        ShopItemDataDetailsComponent,
        ShopItemDataTableComponent,
        ShopItemProcessTableComponent,
        LabComponent,
        GeneralStoreComponent,
        CarpenterComponent,
        ShopItemProcessDataDetailsComponent,
        OpeningHoursComponent,
        ItemUpgradeDetailsComponent,
        ItemUpgradeTableComponent,
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
    exports: [OfferingsTableComponent, ShopItemDataTableComponent, ShopItemProcessTableComponent],
})
export class LocationsModule {
}
