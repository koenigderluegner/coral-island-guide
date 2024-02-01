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
import { BlacksmithComponent } from './components/shops/blacksmith/blacksmith.component';
import { CraftingModule } from '../crafting/crafting.module';
import { ShopItemDataDetailsComponent } from './components/shop-item-data-details/shop-item-data-details.component';
import { ShopItemDataTableComponent } from './components/tables/shop-item-data-table/shop-item-data-table.component';
import { ShopItemProcessTableComponent } from './components/tables/shop-item-process-table/shop-item-process-table.component';
import { LabComponent } from './components/shops/lab/lab.component';
import { ShopItemProcessDataDetailsComponent } from './components/shop-item-process-data-details/shop-item-process-data-details.component';
import { OpeningHoursComponent } from './components/opening-hours/opening-hours.component';
import { GeneralStoreComponent } from './components/shops/general-store/general-store.component';
import { CarpenterComponent } from './components/shops/carpenter/carpenter.component';
import { ItemUpgradeDetailsComponent } from './components/item-upgrade-details/item-upgrade-details.component';
import { ItemUpgradeTableComponent } from './components/tables/item-upgrade-table/item-upgrade-table.component';
import { MerfolkGeneralStoreComponent } from './components/shops/merfolk-general-store/merfolk-general-store.component';
import { MerfolkOracleTailStoreComponent } from './components/shops/merfolk-oracle-tail-store/merfolk-oracle-tail-store.component';
import { PetShopComponent } from './components/pet-shop/pet-shop.component';
import { PetAdoptionDetailsComponent } from './components/pet-adoption-details/pet-adoption-details.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RanchComponent } from './components/ranch/ranch.component';
import { BeachShackComponent } from './components/shops/beach-shack/beach-shack.component';
import { ConcernedMonkeyComponent } from './components/shops/concerned-monkey/concerned-monkey.component';
import { MeritShopComponent } from './components/merit-shop/merit-shop.component';
import { MeritShopDetailsComponent } from './components/merit-shop-details/merit-shop-details.component';
import { BosComponent } from './components/shops/bos/bos.component';
import { BensCaravanComponent } from './components/shops/bens-caravan/bens-caravan.component';
import { SocketAndPanComponent } from './components/shops/socket-and-pan/socket-and-pan.component';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';
import { GenericFestivalComponent } from './components/generic-festival/generic-festival.component';
import { GenericShopComponent } from './components/shops/generic-shop/generic-shop.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FestivalShopItemDetailsComponent } from './components/festival-shop-item-details/festival-shop-item-details.component';
import { FestivalShopItemTableComponent } from './components/tables/festival-shop-item-table/festival-shop-item-table.component';
import { CoffeeComponent } from './components/shops/coffee/coffee.component';
import { WhiteFlamingoComponent } from './components/shops/white-flamingo/white-flamingo.component';
import { AnimalMoodTableComponent } from './components/tables/animal-mood-table/animal-mood-table.component';
import { TavernComponent } from "./components/shops/tavern/tavern.component";
import { AddSpacesToPascalCasePipe } from "../shared/pipes/add-spaces-to-pascal-case.pipe";
import { DatabaseItemDetailsDirective } from "../shared/directives/database-item-details.directive";
import { ItemCardSwitchComponent } from "../shared/components/item-card-switch/item-card-switch.component";
import { OfferingComponent } from "../shared/components/database-item-details/offering/offering.component";

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
        MerfolkGeneralStoreComponent,
        MerfolkOracleTailStoreComponent,
        PetShopComponent,
        PetAdoptionDetailsComponent,
        RanchComponent,
        BeachShackComponent,
        ConcernedMonkeyComponent,
        MeritShopComponent,
        MeritShopDetailsComponent,
        BosComponent,
        BensCaravanComponent,
        SocketAndPanComponent,
        AnimalDetailsComponent,
        GenericFestivalComponent,
        GenericShopComponent,
        FestivalShopItemDetailsComponent,
        FestivalShopItemTableComponent,
        CoffeeComponent,
        WhiteFlamingoComponent,
        AnimalMoodTableComponent,
        TavernComponent,
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
        MatTooltipModule,
        MatProgressSpinnerModule,
        AddSpacesToPascalCasePipe,
        DatabaseItemDetailsDirective,
        ItemCardSwitchComponent,
        OfferingComponent,
    ],
    exports: [
        OfferingsTableComponent,
        ShopItemDataTableComponent,
        ShopItemProcessTableComponent,
        ItemUpgradeTableComponent,
        FestivalShopItemTableComponent,
    ],
})
export class LocationsModule {}
