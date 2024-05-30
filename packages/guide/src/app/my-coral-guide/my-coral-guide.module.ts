import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCoralGuideComponent } from './my-coral-guide.component';
import { IndexComponent } from './components/index/index.component';
import { MyCoralGuideRoutingModule } from './my-coral-guide-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MuseumChecklistComponent } from './components/museum-checklist/museum-checklist.component';
import { JournalModule } from '../journal/journal.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { CookingRecipesChecklistComponent } from './components/cooking-recipes-checklist/cooking-recipes-checklist.component';
import { OfferingsChecklistComponent } from './components/offerings-checklist/offerings-checklist.component';
import { LocationsModule } from "../locations/locations.module";
import { AddSpacesToPascalCasePipe } from "../shared/pipes/add-spaces-to-pascal-case.pipe";
import { CookingRecipeComponent } from "../shared/components/database-item-details/cooking-recipe/cooking-recipe.component";
import { DatabaseItemDetailsComponent } from "../shared/components/database-item-details/database-item-details.component";
import { DatabaseItemDetailsDirective } from "../shared/directives/database-item-details.directive";
import { ConsumableComponent } from "../shared/components/database-item-details/consumable/consumable.component";
import { ShopProcessingResultComponent } from "../shared/components/database-item-details/shop-processing-result/shop-processing-result.component";
import { FishComponent } from "../shared/components/database-item-details/fish/fish.component";
import { InsectComponent } from "../shared/components/database-item-details/insect/insect.component";
import { ItemCardSwitchComponent } from "../shared/components/item-card-switch/item-card-switch.component";
import { CropComponent } from "../shared/components/database-item-details/crop/crop.component";
import { AnimalProduceComponent } from "../shared/components/database-item-details/animal-produce/animal-produce.component";
import { ProcessingComponent } from "../shared/components/database-item-details/processing/processing.component";
import { OfferingComponent } from "../shared/components/database-item-details/offering/offering.component";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { DashboardFilterComponent } from "./components/dashboard-filter/dashboard-filter.component";
import { BirthdayDashboardComponent } from "./dashboards/birthday-dashboard/birthday-dashboard.component";

@NgModule({
    declarations: [
        MyCoralGuideComponent,
        IndexComponent,
        MuseumChecklistComponent,
        CookingRecipesChecklistComponent,
        OfferingsChecklistComponent,
    ],
    imports: [
        CommonModule,
        MyCoralGuideRoutingModule,
        SharedModule,
        JournalModule,
        MatTabsModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        LocationsModule,
        AddSpacesToPascalCasePipe,
        CookingRecipeComponent,
        DatabaseItemDetailsComponent,
        DatabaseItemDetailsDirective,
        ConsumableComponent,
        ShopProcessingResultComponent,
        FishComponent,
        InsectComponent,
        ItemCardSwitchComponent,
        CropComponent,
        AnimalProduceComponent,
        ProcessingComponent,
        OfferingComponent,
        MatProgressSpinner,
        DashboardFilterComponent,
        BirthdayDashboardComponent
    ],
})
export class MyCoralGuideModule {
}
