import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseComponent } from './database.component';
import { DatabaseRoutingModule } from './database-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { DatabaseDetailsComponent } from './components/database-details/database-details.component';
import { DatabaseFishingComponent } from './components/database-fishing/database-fishing.component';
import { DatabaseInsectsComponent } from './components/database-insects/database-insects.component';
import { DatabaseSeaCrittersComponent } from './components/database-sea-critters/database-sea-critters.component';
import { DatabaseCropsComponent } from './components/database-crops/database-crops.component';
import { DatabaseAnimalProductsComponent } from './components/database-animal-products/database-animal-products.component';
import { DatabaseArtisanComponent } from './components/database-artisan/database-artisan.component';
import { DatabaseCraftingComponent } from './components/database-crafting/database-crafting.component';
import { DatabaseCookingComponent } from './components/database-cooking/database-cooking.component';
import { DatabaseGiftsComponent } from './components/database-gifts/database-gifts.component';
import { BaseDatabaseDetailPartComponent } from './components/base-database-detail-part.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { JournalModule } from '../journal/journal.module';
import { CraftingModule } from '../crafting/crafting.module';
import { DatabaseOfferingsComponent } from './components/database-offerings/database-offerings.component';
import { LocationsModule } from '../locations/locations.module';
import { DatabaseShopDataComponent } from './components/database-shop-data/database-shop-data.component';
import { DatabaseShopItemProcessComponent } from './components/database-shop-item-process/database-shop-item-process.component';
import { DatabaseItemUpgradeComponent } from './components/database-item-upgrade/database-item-upgrade.component';
import { DatabaseBestiaryComponent } from './components/database-bestiary/database-bestiary.component';
import { MatButtonModule } from '@angular/material/button';
import { DatabaseHeaderButtonComponent } from './components/database-header-button/database-header-button.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { DatabaseFestivalShopDataComponent } from './components/database-festival-shop-data/database-festival-shop-data.component';
import { UiIconComponent } from "../shared/components/ui-icon/ui-icon.component";

@NgModule({
    declarations: [
        DatabaseComponent,
        DatabaseDetailsComponent,
        DatabaseFishingComponent,
        DatabaseInsectsComponent,
        DatabaseSeaCrittersComponent,
        DatabaseCropsComponent,
        DatabaseAnimalProductsComponent,
        DatabaseArtisanComponent,
        DatabaseCraftingComponent,
        DatabaseCookingComponent,
        DatabaseGiftsComponent,
        BaseDatabaseDetailPartComponent,
        DatabaseOfferingsComponent,
        DatabaseShopDataComponent,
        DatabaseShopItemProcessComponent,
        DatabaseItemUpgradeComponent,
        DatabaseBestiaryComponent,
        DatabaseHeaderButtonComponent,
        DatabaseFestivalShopDataComponent,
    ],
    imports: [
        CommonModule,
        DatabaseRoutingModule,
        SharedModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        JournalModule,
        CraftingModule,
        LocationsModule,
        MatButtonModule,
        MatSortModule,
        MatTableModule,
        UiIconComponent,
    ],
})
export class DatabaseModule {
}
