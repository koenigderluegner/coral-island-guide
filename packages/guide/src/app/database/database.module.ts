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
    ],
    imports: [
        CommonModule,
        DatabaseRoutingModule,
        SharedModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
})
export class DatabaseModule {
}
